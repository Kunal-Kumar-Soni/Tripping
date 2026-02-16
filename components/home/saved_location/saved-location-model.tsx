"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { SavedLocationsType } from "./locations-list";

type SavedLocationModelType = {
  activeCategory: string;
  setSavedLocations: Dispatch<SetStateAction<SavedLocationsType[]>>;
};

export function SavedLocationModel({ activeCategory, setSavedLocations }: SavedLocationModelType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { name, location } = Object.fromEntries(formData) as Record<string, string>;

    if (name.trim() === "" || location.trim() === "") return;

    const newData = {
      id: crypto.randomUUID().toString(),
      title: name,
      address: location,
      category: activeCategory,
    };

    setSavedLocations((prev) => [...prev, newData]);
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button className="py-6 rounded-full">Add Activity</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Activity</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Input required className="bg-muted py-5 rounded-lg" name="name" placeholder="Name" />
            <Input
              required
              className="bg-muted py-5 rounded-lg"
              name="location"
              placeholder="Location"
            />
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
