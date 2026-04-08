"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { getDistance } from "@/lib/map";
import { Plan } from "@/types/plan";

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

const TRANSPORT_MODES: Record<
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

  useEffect(() => {
    if (!currentEvent || !nextEvent) return;
    const fetchDistance = async () => {
      setDistance(null);
      setIsLoading(true);
      try {
        const { lat: lat1, lng: lng1 } = currentEvent;
        const { lat: lat2, lng: lng2 } = nextEvent;
        const origins = `${lat1},${lng1}`;
        const destinations = `${lat2},${lng2}`;
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
                const mode = TRANSPORT_MODES[key];
                const data = distance
                  ? (distance as DistanceResult)[key as keyof DistanceResult]
                  : null;

                return (
                  <Button
                    disabled={data?.status !== "OK"}
                    variant={"outline"}
                    className={`flex-1 cursor-pointer py-6 text-start`}
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
            <Button className="flex-1 rounded-full" variant="outline">
              Remove
            </Button>

            <Button className="flex-1 rounded-full" type="submit">
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
