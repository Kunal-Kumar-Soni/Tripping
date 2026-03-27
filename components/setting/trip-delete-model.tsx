"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/hooks/useTrip";
import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";

export function TripDeleteModel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { selectedTrip, handleDeleteSingleTrip, mutationType } = useTrip();
  if (!selectedTrip) return null;

  const isDeleting = mutationType === "delete";

  const handleDelete = async () => {
    await handleDeleteSingleTrip(selectedTrip?.id);
    new Promise((res) => setTimeout(res, 3000));
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <BsTrash3 />
          <span>Delete Trip</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "
            <span className="font-semibold">{selectedTrip?.title}</span>"? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant={"destructive"} disabled={isDeleting} onClick={handleDelete}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
