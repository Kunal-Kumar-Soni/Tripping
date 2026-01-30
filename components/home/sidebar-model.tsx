import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { differenceInDays } from "date-fns";

export function SidebarModel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { tripName, startDate, endDate, personCount, estimatedPrice } = Object.fromEntries(
      formData,
    ) as Record<string, string>;

    const duration = differenceInDays(new Date(endDate), new Date(startDate)) + 1;

    console.log({ tripName, startDate, endDate, duration, personCount, estimatedPrice });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <Plus className="p-2 border rounded-full" size={35} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Trip</DialogTitle>
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

            <div className="gap-3 grid">
              <Label htmlFor="person-count">Person</Label>
              <Input required type="number" id="person-count" name="personCount" />
            </div>

            <div className="gap-3 grid">
              <Label htmlFor="estimated-price">Estimated Price</Label>
              <Input required type="number" id="estimated-price" name="estimatedPrice" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">Create Trip</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
