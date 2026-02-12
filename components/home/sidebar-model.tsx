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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export function SidebarModel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { tripName, startDate, endDate, status, budget, destination, description } =
      Object.fromEntries(formData) as Record<string, string>;

    console.log({ tripName, startDate, endDate, status, budget, destination, description });

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
              <Label htmlFor="budget">Budget</Label>
              <Input required type="number" id="budget" name="budget" />
            </div>

            <div className="gap-3 grid">
              <Label htmlFor="budget">Status</Label>
              <Select name="status">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="gap-3 grid col-span-2">
              <Label htmlFor="destination">Destination</Label>
              <Input required id="destination" name="destination" />
            </div>

            <div className="gap-3 grid col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                required
                id="description"
                name="description"
                placeholder="Type your description here."
                rows={5}
                className="max-h-30"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              className="px-8 py-5 rounded-full"
              onClick={() => setIsOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button className="px-8 py-5 rounded-full" type="submit">
              Create Trip
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
