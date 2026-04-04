"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCar, FaMapPin, FaWalking } from "react-icons/fa";

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
  nextEvent: Plan | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type DistanceResult = {
  driving: DistanceMatrixRowElement;
  walking: DistanceMatrixRowElement;
};

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
        <DialogContent aria-describedby={undefined} className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Connection</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <FaMapPin /> <span>{currentEvent.title}</span>
            </div>
            <div className="flex gap-1">
              <div className="flex flex-1 items-center gap-3 rounded-md border px-4 py-2">
                <FaCar />
                <div className="w-full text-sm leading-tight">
                  <h1 className="font-bold">Driving</h1>
                  {isLoading ? (
                    <Skeleton className="h-5" />
                  ) : (
                    <h2 className="text-muted-foreground">
                      {distance?.driving?.duration?.text || "Not available"}
                    </h2>
                  )}
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3 rounded-md border px-4 py-2">
                <FaWalking />
                <div className="w-full text-sm leading-tight">
                  <h1 className="font-bold">Walking</h1>
                  {isLoading ? (
                    <Skeleton className="h-5" />
                  ) : (
                    <h2 className="text-muted-foreground">
                      {distance?.walking?.duration?.text || "Not available"}
                    </h2>
                  )}
                </div>
              </div>
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
