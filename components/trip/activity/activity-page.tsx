"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";

import LocationsList from "./activity-list";
import { Button } from "@/components/ui/button";
import { IoMapOutline, IoMenu } from "react-icons/io5";
import { useState } from "react";

import { BiSolidLandmark } from "react-icons/bi";
import { MdHiking, MdOutlineRestaurant } from "react-icons/md";
import { useActivity } from "@/hooks/useActivity";
import { ActivityFromModel } from "./activity-from-model";

export function ActivityPage() {
  const [activeCategory, setActiveCategory] = useState<string>("restaurant");
  const { activities } = useActivity();

  const filteredLocations = activities.filter((loc) => loc.category === activeCategory);

  const locationsButtons = [
    { type: "restaurant", icon: MdOutlineRestaurant },
    { type: "hotel", icon: BiSolidLandmark },
    { type: "activity", icon: MdHiking },
  ];

  return (
    <Card className="top-30 right-6 fixed py-4 w-full max-w-94">
      <CardContent className="px-4">
        <Collapsible defaultOpen className="rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <IoMapOutline size={18} />
              <h1 className="font-semibold">Saved Locations</h1>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant={"outline"} size={"icon-lg"} className="group rounded-full">
                <ChevronDownIcon className="group-data-[state=open]:rotate-180 transition-transform" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-col gap-2 pt-4 text-sm">
            {/* Buttons */}
            <div className="flex gap-2">
              {locationsButtons.map((btn) => {
                const Icon = btn.icon;
                return (
                  <Button
                    key={btn.type}
                    className="rounded-full"
                    size="icon-lg"
                    variant={activeCategory === btn.type ? "default" : "outline"}
                    onClick={() => setActiveCategory(btn.type)}
                  >
                    <Icon />
                  </Button>
                );
              })}
            </div>
            {/* Locations list */}

            <LocationsList activities={filteredLocations} />

            {/* Add new activity Model */}
            <ActivityFromModel mode="create" />

            {/* Drag hint */}
            <IoMenu className="mx-auto mt-3" size={20} />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
