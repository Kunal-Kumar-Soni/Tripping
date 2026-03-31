"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { Ellipsis } from "lucide-react";
import { useDebounce } from "use-debounce";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActivity } from "@/hooks/useActivity";
import { getPlaceAutocomplete } from "@/lib/map";
import { Activity } from "@/types/activity";
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
  const [name, setName] = useState<string>(initialData?.name || "");
  const [location, setLocation] = useState<string>(initialData?.location || "");
  const [suggestions, setSuggestions] = useState<PlaceAutocompleteResult[]>([]);
  const [isSelected, setIsSelected] = useState<string | null>(null);
  const [isTyped, setIsTyped] = useState<boolean>(false);
  const {
    handleCreateSingleActivity,
    handleUpdateSingleActivity,
    handleDeleteSingleActivity,
    mutationType,
  } = useActivity();

  const isUpdate = mode === "update";
  const [debounceInput] = useDebounce(name, 400);

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

  const handleSelect = (selectedData: PlaceAutocompleteResult) => {
    const { structured_formatting } = selectedData;

    const SelectedName =
      structured_formatting?.main_text || selectedData.description;
    setName(SelectedName);
    setIsSelected(SelectedName);
    setLocation(structured_formatting?.secondary_text || "no location");
    setIsTyped(false);
    setSuggestions([]);
  };

  useEffect(() => {
    if (!isTyped) return;
    const fetchAutoCompleteSuggestions = async () => {
      if (isSelected === debounceInput) return;
      if (!debounceInput) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await getPlaceAutocomplete(debounceInput);
        setSuggestions(res ?? []);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };
    fetchAutoCompleteSuggestions();
  }, [debounceInput, isTyped, isSelected]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (open) {
      if (isUpdate && initialData?.category && setActiveCategory) {
        setActiveCategory(initialData?.category);
      } else {
        setName(initialData?.name || "");
        setLocation(initialData?.location || "");
        setSuggestions([]);
        setIsSelected(null);
        setIsTyped(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger className="w-full" asChild>
        {isUpdate ? (
          <button className="cursor-pointer">
            <Ellipsis size={18} />
          </button>
        ) : (
          <Button className="rounded-full py-6">Add Activity</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {isUpdate ? "Edit Activity" : "Add Activity"}
            </DialogTitle>
            <DialogDescription>
              {isUpdate
                ? "Update the activity details to keep your trip organized."
                : "Enter activity details to keep your trip organized."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 grid w-full gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setIsTyped(true);
                }}
                onBlur={() => {
                  setTimeout(() => setSuggestions([]), 100);
                }}
                required
                id="name"
                name="name"
                autoComplete="off"
              />

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="bg-background absolute top-17 left-0 z-50 w-full rounded-md border shadow-md">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.place_id}
                      onClick={() => {
                        handleSelect(suggestion);
                      }}
                      className="hover:bg-muted cursor-pointer px-3 py-2 text-sm"
                    >
                      {suggestion.description}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-2 grid gap-3">
              <Label>Location</Label>
              <Input
                className="bg-muted focus-visible:border-input text-muted-foreground cursor-not-allowed rounded-md text-sm focus-visible:ring-0"
                readOnly
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="col-span-2 grid gap-3">
              <Label>Category</Label>
              <Select
                name="category"
                defaultValue={initialData?.category || "restaurant"}
              >
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
          <DialogFooter className="flex w-full gap-2">
            {isUpdate && initialData ? (
              <Button
                disabled={isDeleting}
                onClick={async () => {
                  await handleDeleteSingleActivity(initialData.id);
                  setIsOpen(false);
                }}
                className="flex-1 rounded-full py-5"
                variant="outline"
                type="button"
              >
                {isDeleting ? "Delete..." : "Delete"}
              </Button>
            ) : (
              <Button
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-full py-5"
                variant="outline"
                type="button"
              >
                Cancel
              </Button>
            )}
            <Button
              disabled={isSubmitting}
              className="flex-1 rounded-full py-5"
              type="submit"
            >
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
