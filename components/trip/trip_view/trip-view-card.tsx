import { formatHour12 } from "@/lib/date";
import { useDraggable } from "@dnd-kit/core";
import { FaHotel } from "react-icons/fa";

export type Activity = {
  id: number;
  title: string;
  date: string;
  hour: number;
};

type TripViewCardProps = {
  activity: Activity;
  isDark: boolean;
};

const TripViewCard = ({ activity, isDark }: TripViewCardProps) => {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: activity.id,
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
      className={`flex relative justify-between items-center shadow py-2 px-4 rounded w-full h-15 ${isDark ? "bg-black/80 text-white" : ""} }`}
    >
      <div className="flex items-center gap-4">
        <FaHotel />
        <div className="font-semibold text-sm">
          <h1>{activity.title}</h1>
          <h1 className="text-muted-foreground">Address</h1>
        </div>
      </div>

      <h1 className="top-1 right-2 absolute text-[13px] text-muted-foreground">
        {formatHour12(activity.hour)}
      </h1>
      <h1 className="right-2 bottom-1 absolute text-[13px] text-muted-foreground">
        {formatHour12(activity.hour + 1)}
      </h1>
    </div>
  );
};

export default TripViewCard;
