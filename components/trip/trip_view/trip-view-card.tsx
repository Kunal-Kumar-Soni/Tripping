import { usePlan } from "@/hooks/usePlan";
import { formatHour12 } from "@/lib/plan-formate";
import { Plan } from "@/types/plan";
import { useDraggable } from "@dnd-kit/core";
import { FaHotel } from "react-icons/fa";

type TripViewCardProps = {
  activity: Plan;
  isDark: boolean;
};

const TripViewCard = ({ activity, isDark }: TripViewCardProps) => {
  const { mutationType } = usePlan();
  const isUpdating = mutationType !== null;
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: `timelineId-${activity.id}`,
    disabled: isUpdating,
    data: {
      activity,
      type: "timeline",
    },
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
      className={`flex relative justify-between items-center shadow py-2 px-4 rounded w-full h-15 
       ${isDark ? "bg-black/80 text-white" : ""}
       ${isUpdating ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-move"}}`}
    >
      <div className="flex items-center gap-4">
        <FaHotel />
        <div className="font-semibold text-sm">
          <h1>{activity.title}</h1>
          <h1 className="text-muted-foreground">{activity.address}</h1>
        </div>
      </div>

      <h1 className="top-1 right-2 absolute text-[13px] text-muted-foreground">
        {formatHour12(activity.start_time)}
      </h1>
      <h1 className="right-2 bottom-1 absolute text-[13px] text-muted-foreground">
        {formatHour12(activity.end_time)}
      </h1>
    </div>
  );
};

export default TripViewCard;
