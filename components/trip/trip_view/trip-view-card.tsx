import { usePlan } from "@/hooks/usePlan";
import { formatHour, formatHour12, formatHourToNumber } from "@/lib/plan-formate";
import { Plan } from "@/types/plan";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { BiSolidLandmark } from "react-icons/bi";
import { FaHotel } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { MdHiking, MdOutlineRestaurant } from "react-icons/md";

type TripViewCardProps = {
  activity: Plan;
  isDark: boolean;
};

const ROW_HEIGHT = 60;

const TripViewCard = ({ activity, isDark }: TripViewCardProps) => {
  const [previewEndHour, setPreviewEndHour] = useState<number | null>(null);
  const { mutationType, handleUpdateSinglePlan } = usePlan();
  const isUpdating = mutationType !== null;
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: `timelineId-${activity.id}`,
    disabled: isUpdating,
    data: {
      activity,
      type: "timeline",
    },
  });

  const style = {
    ...(transform && {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      zIndex: 50,
    }),
  };

  // =====  calculation =====
  const startHour = formatHourToNumber(activity.start_time);
  const endHour = formatHourToNumber(activity.end_time);

  const effectiveEnd = previewEndHour ?? endHour;
  const duration = Math.max(1, effectiveEnd - startHour);
  const height = duration * ROW_HEIGHT - 4;
  const top = startHour * ROW_HEIGHT + 4;

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const startHour = formatHourToNumber(activity.start_time);
    let newHour = formatHourToNumber(activity.end_time) - 1;

    const handleMouseMove = (e: MouseEvent) => {
      const container = document.querySelector("[data-timeline]");
      if (!container) return;

      const rect = container.getBoundingClientRect();

      const offsetY = e.clientY - rect.top;

      const hour = Math.floor(offsetY / ROW_HEIGHT);

      newHour = hour;
      setPreviewEndHour(hour + 1);
    };

    const handleMouseUp = async () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      setPreviewEndHour(null);

      if (newHour < startHour) {
        newHour = startHour;
      }

      const newEndTime = formatHour(newHour + 1);

      const currentEnd = formatHourToNumber(activity.end_time);
      if (newHour + 1 === currentEnd) return;

      const { id, trip_id, created_at, updated_at, status, ...rest } = activity;

      const payload = {
        ...rest,
        end_time: newEndTime,
      };
      // console.log(payload);
      await handleUpdateSinglePlan(activity.id, payload);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const IconsType = [
    { type: "restaurant", icon: MdOutlineRestaurant },
    { type: "hotel", icon: BiSolidLandmark },
    { type: "activity", icon: MdHiking },
  ];

  const Icon: IconType = IconsType.find((el) => el.type === activity.type)?.icon ?? MdHiking;

  return (
    <div
      style={{ ...style, height, top }}
      ref={setNodeRef}
      className={`absolute left-2 right-2 shadow rounded-lg pointer-events-auto  ${isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-move"} ${isDark ? "bg-black/80 text-white" : "bg-white/80 text-black"}`}
    >
      <div {...attributes} {...listeners} className={`px-4 py-2 w-full h-full`}>
        <div className="flex items-center gap-4">
          <Icon />
          <div className="font-semibold text-sm">
            <h1>{activity.title}</h1>
            <h1 className="text-muted-foreground">{activity.location_name}</h1>
          </div>
        </div>

        <h1 className="top-1 right-2 absolute text-[13px] text-muted-foreground">
          {formatHour12(activity.start_time)}
        </h1>
        <h1 className="right-2 bottom-1 absolute text-[13px] text-muted-foreground">
          {formatHour12(activity.end_time)}
        </h1>
      </div>

      <div
        onMouseDown={handleResizeStart}
        className="bottom-0 absolute bg-transparent w-full h-2 cursor-ns-resize"
      />
      {previewEndHour && (
        <div className="right-2 bottom-0 left-2 absolute bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.7)] h-0.5" />
      )}
    </div>
  );
};

export default TripViewCard;
