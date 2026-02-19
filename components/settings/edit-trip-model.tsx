import { useTrip } from "@/hooks/useTrip";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { TripForm } from "../trips/trip-form";
import { LuSlash } from "react-icons/lu";

export function EditTripModel() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleUpdateSingleTrip, selectedTrip } = useTrip();

  if (!selectedTrip) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon-sm"} className="border-foreground rounded-full">
          <LuSlash />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Trip</DialogTitle>
          <DialogDescription>Update the details of your trip below.</DialogDescription>
        </DialogHeader>
        <TripForm
          initialData={selectedTrip}
          submitLabel="Save Changes"
          onSubmit={(data) => {
            handleUpdateSingleTrip(selectedTrip?.id, data);
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
