"use client";
import { Activity } from "@/types/activity";
import { IconType } from "react-icons/lib";
import { ActivityFromModel } from "./activity-from-model";
import { useDraggable } from "@dnd-kit/core";
import { usePlan } from "@/hooks/usePlan";

type Props = {
  activity: Activity;
  Icon: IconType;
};

const ActivityCard = ({ activity, Icon }: Props) => {
  const { mutationType } = usePlan();
  const isUpdating = mutationType !== null;
  const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({
    id: `activity-${activity.id}`,
    data: {
      activity,
      type: "activity",
    },
    disabled: isUpdating,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        cursor: "move",
        zIndex: "50",
      }
    : undefined;

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`flex justify-between px-5 py-2 border rounded-xl ${
        isUpdating ? "opacity-50 cursor-not-allowed bg-muted" : "hover:bg-accent"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />

        <div className="pr-1 leading-tight">
          <h1 className="font-semibold line-clamp-1 w">{activity.name}</h1>
          <p className="text-muted-foreground line-clamp-1">{activity.location}</p>
        </div>
      </div>

      <div onClick={(e) => e.stopPropagation()} className="flex items-center">
        <ActivityFromModel mode="update" initialData={activity} />
      </div>
    </div>
  );
};

export default ActivityCard;
