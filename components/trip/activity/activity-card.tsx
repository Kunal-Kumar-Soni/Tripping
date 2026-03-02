"use client";
import { Activity } from "@/types/activity";
import { IconType } from "react-icons/lib";
import { ActivityFromModel } from "./activity-from-model";

type Props = {
  activity: Activity;
  Icon: IconType;
};

const ActivityCard = ({ activity, Icon }: Props) => {
  return (
    <div className="flex justify-between px-5 py-2 border rounded-xl">
      <div className="flex items-center gap-4">
        <Icon size={18} />

        <div className="leading-tight">
          <h1 className="font-semibold">{activity.name}</h1>
          <p className="text-muted-foreground">{activity.location}</p>
        </div>
      </div>

      <div className="flex items-center">
        <ActivityFromModel mode="update" initialData={activity} />
      </div>
    </div>
  );
};

export default ActivityCard;
