"use client";
import { useEffect, useState } from "react";

import { useDroppable } from "@dnd-kit/core";
import { ChevronDownIcon } from "lucide-react";
import { BiSolidLandmark } from "react-icons/bi";
import { IoMapOutline, IoMenu } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdHiking, MdOutlineRestaurant } from "react-icons/md";

import { useActivity } from "@/hooks/useActivity";

import { ActivityType } from "@/types/common";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Spinner2 } from "@/components/ui/spinner";

import { ActivityFromModel } from "./activity-from-model";
import LocationsList from "./activity-list";

const locationsButtons: { type: ActivityType; icon: IconType }[] = [
  { type: "restaurant", icon: MdOutlineRestaurant },
  { type: "hotel", icon: BiSolidLandmark },
  { type: "activity", icon: MdHiking },
];

export function ActivityPage() {
  const [activeCategory, setActiveCategory] =
    useState<ActivityType>("restaurant");
  const { activities, loadingActivities, mutationType } = useActivity();

  const filteredLocations =
    activities?.filter((loc) => loc.category === activeCategory) ?? [];

  const { setNodeRef, isOver } = useDroppable({ id: "activity-drop" });

  useEffect(() => {
    if (!activities || activities.length === 0) return;
    if (mutationType === "create") {
      const latestActivity = activities[0];
      setActiveCategory(latestActivity.category);
    }
  }, [activities, mutationType]);

  return (
    <Card
      ref={setNodeRef}
      className={`top-30 z-40 right-6 fixed py-4 w-full max-w-100  ${isOver ? "bg-muted border-dashed border-blue-500" : ""}`}
    >
      <CardContent className="px-4">
        <Collapsible defaultOpen className="rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <IoMapOutline size={18} />
              <h1 className="font-semibold">Saved Locations</h1>
            </div>
            <CollapsibleTrigger asChild>
              <Button
                variant={"outline"}
                size={"icon-lg"}
                className="group rounded-full"
              >
                <ChevronDownIcon className="group-data-[state=open]:rotate-180 transition-transform" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-col gap-2 pt-4 text-sm">
            {/* Buttons */}
            <div className="flex gap-2">
              {locationsButtons.map((btn) => {
                const Icon = btn.icon;
                const activityType = btn.type;
                return (
                  <Button
                    key={btn.type}
                    className="rounded-full"
                    size="icon-lg"
                    variant={
                      activeCategory === activityType ? "default" : "outline"
                    }
                    onClick={() => setActiveCategory(activityType)}
                  >
                    <Icon />
                  </Button>
                );
              })}
            </div>
            {/* Locations list */}

            {loadingActivities ? (
              <Spinner2 className="mx-auto w-6 h-6 text-blue-600" />
            ) : (
              <LocationsList activities={filteredLocations} />
            )}

            {/* Add new activity Model */}
            <ActivityFromModel
              setActiveCategory={setActiveCategory}
              mode="create"
            />

            {/* Drag hint */}
            <IoMenu className="mx-auto mt-3" size={20} />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
