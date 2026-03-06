import { useTrip } from "@/hooks/useTrip";
import { useState } from "react";
import { TripForm } from "../common/trip-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BsPlusLg } from "react-icons/bs";
import { Button } from "@/components/ui/button";

export function SidebarModel() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleCreateSingleTrip } = useTrip();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="icon-lg" className="rounded-full cursor-pointer">
          <BsPlusLg />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Trip</DialogTitle>
          <DialogDescription>
            Fill in the trip details below. You can update them later if needed.
          </DialogDescription>
        </DialogHeader>
        <TripForm
          submitLabel="Create Trip"
          onSubmit={(data) => {
            handleCreateSingleTrip(data);
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
