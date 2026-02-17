"use client";
import {
  AlertDialog,
  AlertDialogAction,
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
import { useRouter } from "next/navigation";
import { BsTrash3 } from "react-icons/bs";

export function TripDeleteModel() {
  const router = useRouter();
  const { selectedTrip, handleDeleteSingleTrip } = useTrip();
  if (!selectedTrip) return null;

  return (
    <AlertDialog>
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
          <AlertDialogAction
            variant={"destructive"}
            onClick={() => handleDeleteSingleTrip(selectedTrip?.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
