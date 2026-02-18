"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsPlusLg } from "react-icons/bs";
import { useState } from "react";

import { useTrip } from "@/hooks/useTrip";
import { CreateTrip } from "@/types/trips";

export function SidebarModel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { handleCreateSingleTrip } = useTrip();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { budget, startDate, endDate, tripName } = Object.fromEntries(formData);

    const tripData = {
      budget: Number(budget),
      start_date: new Date(startDate as string).toISOString(),
      end_date: new Date(endDate as string).toISOString(),
      title: tripName as string,
    };
    handleCreateSingleTrip(tripData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="icon-lg" className="rounded-full cursor-pointer">
          <BsPlusLg />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a Trip</DialogTitle>
            <DialogDescription>
              Fill in the trip details below. You can update them later if needed.
            </DialogDescription>
          </DialogHeader>

          <div className="gap-4 grid grid-cols-2 my-5">
            <div className="gap-3 grid col-span-2">
              <Label htmlFor="trip-name">Trip Name</Label>
              <Input required id="trip-name" name="tripName" />
            </div>

            <div className="gap-3 grid">
              <Label htmlFor="start-date">Start Date</Label>
              <Input required type="date" id="start-date" name="startDate" />
            </div>

            <div className="gap-3 grid">
              <Label htmlFor="end-date">End Date</Label>
              <Input required type="date" id="end-date" name="endDate" />
            </div>

            <div className="gap-3 grid col-span-2">
              <Label htmlFor="budget">Budget</Label>
              <Input required type="number" id="budget" name="budget" />
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-2 w-full">
              <Button
                className="flex-1 px-8 py-5 rounded-full"
                onClick={() => setIsOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button className="flex-1 px-8 py-5 rounded-full" type="submit">
                Create Trip
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
