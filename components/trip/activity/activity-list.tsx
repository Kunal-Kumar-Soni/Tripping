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

const LocationsList = ({ activities }: { activities: Activity[] }) => {
  return (
    <section className="space-y-4 w-full">
      <div className="flex flex-col gap-1">
        {activities.map((activity) => {
          const Icon = categoryIconMap[activity.category];

          return <ActivityCard key={activity.id} activity={activity} Icon={Icon} />;
        })}
      </div>
    </section>
  );
};

export default LocationsList;
