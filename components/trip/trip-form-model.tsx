"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateTrip, Trip } from "@/types/trip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useTrip } from "@/hooks/useTrip";
import { BsPlusLg } from "react-icons/bs";
import { formatDate, formateDateInIsoString } from "@/lib/plan-formate";
import { LuSlash } from "react-icons/lu";

type TripsFormProps = {
  initialData?: Trip;
  mode: "create" | "update";
};

export function TripFormModel({ mode, initialData }: TripsFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    initialData ? initialData?.start_date.slice(0, 10) : "",
  );
  const { selectedTrip, handleCreateSingleTrip, handleUpdateSingleTrip, mutationType } = useTrip();

  const isUpdate = mode === "update";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { tripName, startDate, endDate, budget } = Object.fromEntries(formData) as {
      tripName: string;
      startDate: string;
      endDate: string;
      budget: string;
    };

    const formValue: CreateTrip = {
      title: tripName,
      start_date: formateDateInIsoString(startDate),
      end_date: formateDateInIsoString(endDate),
      budget: Number(budget),
    };

    if (isUpdate && initialData) {
      const isUnchanged =
        formValue.title === initialData.title &&
        formatDate(formValue.start_date) === formatDate(initialData.start_date) &&
        formatDate(formValue.end_date) === formatDate(initialData.end_date) &&
        formValue.budget === initialData.budget;

      if (isUnchanged) {
        setIsOpen(false);
        return;
      }
    }

    if (isUpdate && initialData && selectedTrip) {
      await handleUpdateSingleTrip(selectedTrip.id, formValue);
    } else {
      await handleCreateSingleTrip(formValue);
    }

    setIsOpen(false);
  };

  // Date Context
  const today = new Date().toISOString().split("T")[0];

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const minEndDate = startDate
    ? new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 4))
        .toISOString()
        .split("T")[0]
    : "";

  const isCreating = mutationType === "create";
  const isUpdating = mutationType === "update";

  const isSubmitting = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isUpdate ? (
          <Button variant={"outline"} size={"icon-sm"} className="border-foreground rounded-full">
            <LuSlash />
          </Button>
        ) : (
          <Button variant={"outline"} size="icon-lg" className="rounded-full cursor-pointer">
            <BsPlusLg />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Edit Trip" : "Create a Trip"}</DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Update the details of your trip below."
              : "Fill in the trip details below. You can update them later if needed."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="gap-4 grid grid-cols-2">
            <div className="gap-3 grid col-span-2">
              <Label htmlFor="trip-name">Trip Name</Label>
              <Input required id="trip-name" name="tripName" defaultValue={initialData?.title} />
            </div>

            <div className="gap-3 grid">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                required
                onChange={handleStartDateChange}
                type="date"
                id="start-date"
                name="startDate"
                min={today}
                defaultValue={initialData?.start_date.slice(0, 10)}
              />
            </div>

            <div className="gap-3 grid">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                required
                type="date"
                id="end-date"
                name="endDate"
                min={minEndDate}
                defaultValue={initialData?.end_date.slice(0, 10)}
              />
            </div>

            <div className="gap-3 grid col-span-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                required
                type="number"
                id="budget"
                name="budget"
                defaultValue={initialData?.budget}
              />
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <DialogClose asChild>
              <Button className="flex-1 px-8 py-5 rounded-full" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isSubmitting} className="flex-1 px-8 py-5 rounded-full" type="submit">
              {isCreating ? "Creating..." : isUpdating ? "Saving..." : isUpdate ? "Save" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
