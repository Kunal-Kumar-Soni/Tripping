"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBusAlt, FaCar, FaMapPin, FaWalking } from "react-icons/fa";
import { IoAirplane } from "react-icons/io5";

import { DistanceMatrixRowElement } from "@googlemaps/google-maps-services-js";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransport } from "@/hooks/useTransport";
import { getDistance } from "@/lib/map";
import { Plan } from "@/types/plan";
import { CreateTransport, Transport, TransportType } from "@/types/transport";

type TransportModelProps = {
  currentEvent: Plan;
  nextEvent?: Plan;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type DistanceResult = {
  driving: DistanceMatrixRowElement;
  walking?: DistanceMatrixRowElement;
  transit?: DistanceMatrixRowElement;
  flight: Omit<DistanceMatrixRowElement, "status"> & { status: string };
};

export const TRANSPORT_MODES_ICONS: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  driving: {
    label: "Driving",
    icon: <FaCar />,
  },
  walking: {
    label: "Walking",
    icon: <FaWalking />,
  },
  transit: {
    label: "Transit",
    icon: <FaBusAlt />,
  },
  flight: {
    label: "Flight",
    icon: <IoAirplane />,
  },
};

const TRANSPORT_KEYS = ["driving", "walking", "transit", "flight"] as const;

export function TransportModel({
  currentEvent,
  nextEvent,
  open,
  setOpen,
}: TransportModelProps) {
  const [distance, setDistance] = useState<DistanceResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTransport, setSelectedTransport] =
    useState<CreateTransport | null>(null);

  const {
    transports,
    mutationType,
    handleCreateSingleTransport,
    handleUpdateSingleTransport,
    handleDeleteSingleTransport,
  } = useTransport();

  useEffect(() => {
    if (!currentEvent || !nextEvent) return;
    const fetchDistance = async () => {
      setDistance(null);
      setIsLoading(true);
      try {
        const origins = `${currentEvent.lat},${currentEvent.lng}`;
        const destinations = `${nextEvent.lat},${nextEvent.lng}`;
        const res = await getDistance(origins, destinations);
        setDistance(res ?? null);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDistance();
  }, [currentEvent, nextEvent]);

  const existingTransport = transports.find(
    (t) =>
      t.from_item_id === currentEvent?.id && t.to_item_id === nextEvent?.id,
  );

  useEffect(() => {
    if (!open) return;

    if (existingTransport) {
      setSelectedTransport(existingTransport);
    } else {
      setSelectedTransport(null);
    }
  }, [open, existingTransport]);

  const handleSelectTransport = async (
    data:
      | (Omit<DistanceMatrixRowElement, "status"> & {
          status: string;
        })
      | null
      | undefined,
    mode: TransportType,
  ) => {
    if (!currentEvent || !nextEvent || !data) return;

    const payload = {
      from_item_id: currentEvent.id,
      to_item_id: nextEvent.id,

      distance_meters: data?.distance.value || 0,
      distance_text: data?.distance.text || "",

      duration_seconds: data?.duration.value || 0,
      duration_text: data?.duration.text || "",

      mode: mode,
    };

    setSelectedTransport(payload);
  };

  const handleDeleteTransport = async () => {
    if (!existingTransport) return;

    await handleDeleteSingleTransport(existingTransport.id);
    setOpen(false);
  };
  const handleUpdateTransport = async () => {
    if (!selectedTransport) return;

    const isSameTransport =
      existingTransport &&
      existingTransport.mode === selectedTransport.mode &&
      existingTransport.duration_seconds ===
        selectedTransport.duration_seconds &&
      existingTransport.distance_meters === selectedTransport.distance_meters;

    if (isSameTransport) return;

    if (existingTransport) {
      await handleUpdateSingleTransport(
        existingTransport.id,
        selectedTransport,
      );
    } else {
      await handleCreateSingleTransport(selectedTransport);
    }
    setOpen(false);
  };

  const isCreating = mutationType === "create";
  const isUpdating = mutationType === "update";
  const isRemoving = mutationType === "delete";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent
          aria-describedby={undefined}
          className="w-[95vw] sm:max-w-3xl"
        >
          <DialogHeader>
            <DialogTitle>Connection</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <FaMapPin /> <span>{currentEvent.title}</span>
            </div>
            <div className="flex justify-between gap-1">
              {TRANSPORT_KEYS.map((key) => {
                const mode = TRANSPORT_MODES_ICONS[key];
                const data = distance
                  ? (distance as DistanceResult)[key as keyof DistanceResult]
                  : null;

                return (
                  <Button
                    onClick={() => handleSelectTransport(data, key)}
                    disabled={data?.status !== "OK"}
                    variant={"outline"}
                    className={`flex-1 cursor-pointer py-6 text-start ${selectedTransport?.mode === key ? "bg-muted" : ""}`}
                    key={key}
                  >
                    <div className="text-xl">{mode?.icon}</div>
                    <div className="w-full text-sm leading-tight">
                      <h1 className="font-bold">{mode.label}</h1>
                      {isLoading ? (
                        <Skeleton className="h-5" />
                      ) : (
                        <h2 className="text-muted-foreground">
                          {data?.duration?.text || "Not available"}
                        </h2>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              <FaMapPin /> <span>{nextEvent?.title}</span>
            </div>
          </div>

          <DialogFooter className="flex">
            <Button
              onClick={handleDeleteTransport}
              disabled={isRemoving}
              type="button"
              className="flex-1 rounded-full"
              variant="outline"
            >
              {isRemoving ? "Removing..." : "Remove"}
            </Button>

            <Button
              onClick={handleUpdateTransport}
              disabled={isCreating || isUpdating}
              className="flex-1 rounded-full"
              type="button"
            >
              {isCreating
                ? "Creating..."
                : isUpdating
                  ? "Updating..."
                  : existingTransport
                    ? "Update"
                    : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
