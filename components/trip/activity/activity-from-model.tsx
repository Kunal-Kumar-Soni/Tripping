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
import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActivity } from "@/hooks/useActivity";
import { Activity } from "@/types/activity";
import { Ellipsis } from "lucide-react";
import { ActivityType } from "@/types/common";

type ActivityFromModelProps = {
  mode: "create" | "update";
  initialData?: Activity;
  setActiveCategory?: Dispatch<SetStateAction<ActivityType>>;
};

type ActivityFormData = {
  name: string;
  location: string;
  category: ActivityType;
};

export function ActivityFromModel({
  mode,
  initialData,
  setActiveCategory,
}: ActivityFromModelProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    handleCreateSingleActivity,
    handleUpdateSingleActivity,
    handleDeleteSingleActivity,
    mutationType,
  } = useActivity();

  const isUpdate = mode === "update";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValue = Object.fromEntries(formData) as ActivityFormData;

    if (isUpdate && initialData) {
      const isUnchanged =
        formValue.name === initialData.name &&
        formValue.location === initialData.location &&
        formValue.category === initialData.category;

      if (isUnchanged) {
        setIsOpen(false);
        return;
      }
    }

    if (isUpdate && initialData) {
      await handleUpdateSingleActivity(initialData.id, formValue);
    } else {
      await handleCreateSingleActivity(formValue);
      if (setActiveCategory) {
        setActiveCategory(formValue.category);
      }
    }
    setIsOpen(false);
  };

  const isCreating = mutationType === "create";
  const isUpdating = mutationType === "update";
  const isDeleting = mutationType === "delete";

  const isSubmitting = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full" asChild>
        {isUpdate ? (
          <button className="cursor-pointer">
            <Ellipsis size={18} />
          </button>
        ) : (
          <Button className="py-6 rounded-full">Add Activity</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{isUpdate ? "Edit Activity" : "Add Activity"}</DialogTitle>
            <DialogDescription>
              {isUpdate
                ? "Update the activity details to keep your trip organized."
                : "Enter activity details to keep your trip organized."}
            </DialogDescription>
          </DialogHeader>
          <div className="gap-4 grid grid-cols-2">
            <div className="gap-3 grid col-span-2">
              <Label htmlFor="name">Name</Label>
              <Input required id="name" name="name" defaultValue={initialData?.name} />
            </div>
            <div className="gap-3 grid col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input required id="location" name="location" defaultValue={initialData?.location} />
            </div>
            <div className="gap-3 grid col-span-2">
              <Label>Category</Label>
              <Select name="category" defaultValue={initialData?.category || "restaurant"}>
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
            {isUpdate && initialData ? (
              <Button
                disabled={isDeleting}
                onClick={async () => {
                  await handleDeleteSingleActivity(initialData.id);
                  setIsOpen(false);
                }}
                className="flex-1 py-5 rounded-full"
                variant="outline"
                type="button"
              >
                {isDeleting ? "Delete..." : "Delete"}
              </Button>
            ) : (
              <Button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-5 rounded-full"
                variant="outline"
                type="button"
              >
                Cancel
              </Button>
            )}
            <Button disabled={isSubmitting} className="flex-1 py-5 rounded-full" type="submit">
              {isCreating
                ? "Adding..."
                : isUpdating
                  ? "Saving..."
                  : isUpdate
                    ? "Save changes"
                    : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
