import { useTrip } from "@/hooks/useTrip";
import { useState } from "react";
import { TripForm } from "./trip-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { BsPlusLg } from "react-icons/bs";

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
