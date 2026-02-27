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
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createActivity } from "@/services/activity";

type SavedLocationFormData = {
  name: string;
  location: string;
  category: string;
};

export function ActivityModel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValue = Object.fromEntries(formData) as SavedLocationFormData;

    createActivity(formValue);
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button className="py-6 rounded-full">Add Activity</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Activity</DialogTitle>
            <DialogDescription>
              Enter activity details to keep your trip organized.
            </DialogDescription>
          </DialogHeader>
          <div className="gap-4 grid grid-cols-2">
            <div className="gap-3 grid col-span-2">
              <Label htmlFor="name">Name</Label>
              <Input required id="name" name="name" />
            </div>
            <div className="gap-3 grid col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input required id="location" name="location" />
            </div>
            <div className="gap-3 grid col-span-2">
              <Label>Category</Label>
              <Select name="category" defaultValue="restaurant">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex gap-2 w-full">
            <Button
              onClick={() => setIsOpen(false)}
              className="flex-1 py-5 rounded-full"
              variant="outline"
              type="button"
            >
              Cancel
            </Button>
            <Button className="flex-1 py-5 rounded-full" type="submit">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
