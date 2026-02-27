"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateTrip, Trip } from "@/types/trip";
import { DialogClose } from "../ui/dialog";

type TripsFormProps = {
  initialData?: Trip;
  onSubmit: (data: CreateTrip) => void;
  submitLabel: string;
};

export function TripForm({ initialData, onSubmit, submitLabel }: TripsFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { budget, startDate, endDate, tripName } = Object.fromEntries(formData);

    onSubmit({
      budget: Number(budget),
      start_date: new Date(startDate as string).toISOString(),
      end_date: new Date(endDate as string).toISOString(),
      title: tripName as string,
    });
  };

  return (
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
            type="date"
            id="start-date"
            name="startDate"
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
        <Button className="flex-1 px-8 py-5 rounded-full" type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
