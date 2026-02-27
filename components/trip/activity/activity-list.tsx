"use client";
import { BiSolidLandmark } from "react-icons/bi";
import { IconType } from "react-icons/lib";
import { MdHiking, MdOutlineRestaurant } from "react-icons/md";
import ActivityCard from "./activity-card";
import { Activity } from "@/types/activity";

const categoryIconMap: { [key: string]: IconType } = {
  restaurant: MdOutlineRestaurant,
  hotel: BiSolidLandmark,
  activity: MdHiking,
};

const LocationsList = ({ locations }: { locations: Activity[] }) => {
  return (
    <section className="space-y-4 w-full">
      <div className="flex flex-col gap-1">
        {locations.map((location) => {
          const Icon = categoryIconMap[location.category];

          return (
            <ActivityCard
              key={location.id}
              name={location.name}
              location={location.location}
              Icon={Icon}
            />
          );
        })}
      </div>
    </section>
  );
};

export default LocationsList;
