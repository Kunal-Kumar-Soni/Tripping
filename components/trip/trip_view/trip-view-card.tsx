"use client";
import { useEffect, useState } from "react";
import { BiSolidLandmark } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { MdHiking, MdOutlineRestaurant } from "react-icons/md";

import { useDraggable } from "@dnd-kit/core";

import { usePlan } from "@/hooks/usePlan";
import {
  formatHour,
  formatHour12,
  formatHourToNumber,
} from "@/lib/plan-formate";
import { Plan } from "@/types/plan";
import { Transport } from "@/types/transport";

import { TRANSPORT_MODES_ICONS } from "./transport-model";

type TripViewCardProps = {
  activity: Plan;
  isDark: boolean;
  nextEvent?: Plan;
  onOpenTransport: (current: Plan, next?: Plan) => void;
  transport?: Transport;
  showTopIcon: boolean;
  topTransport?: Transport;
};

const ROW_HEIGHT = 100;

type ActivityType = "restaurant" | "hotel" | "activity";
type ActivityInfo = { type: ActivityType; icon: IconType };

const IconsType: ActivityInfo[] = [
  { type: "restaurant", icon: MdOutlineRestaurant },
  { type: "hotel", icon: BiSolidLandmark },
  { type: "activity", icon: MdHiking },
];

const TripViewCard = ({
  activity,
  isDark,
  nextEvent,
  onOpenTransport,
  transport,
  showTopIcon,
  topTransport,
}: TripViewCardProps) => {
  const [previewEndHour, setPreviewEndHour] = useState<number | null>(null);
  const { mutationType, handleUpdateSinglePlan } = usePlan();
  const isUpdating = mutationType !== null;

  const [mouseResizeStyle, setMouseResizeStyle] = useState<boolean>(false);

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

  // calculation
  const startHour = formatHourToNumber(activity.start_time);
  const endHour = formatHourToNumber(activity.end_time);

  const effectiveEnd = previewEndHour ?? endHour;
  const duration = Math.max(1, effectiveEnd - startHour);
  const height = duration * ROW_HEIGHT - 40;
  const top = startHour * ROW_HEIGHT + 20;
  const bottom = startHour * ROW_HEIGHT - 20;

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setMouseResizeStyle(true);

    const startHour = formatHourToNumber(activity.start_time);
    let newHour = formatHourToNumber(activity.end_time) - 1;

    const handleMouseMove = (e: MouseEvent) => {
      const container = (e.target as HTMLElement).closest("[data-timeline]");
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;

      let hour = Math.floor(offsetY / ROW_HEIGHT) + 1;

      hour = Math.max(hour, startHour + 1);

      if (nextEvent) {
        const nextStart = formatHourToNumber(nextEvent.start_time);
        hour = Math.min(hour, nextStart);
      }

      newHour = hour;
      setPreviewEndHour(hour);
    };

    const handleMouseUp = async () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      setMouseResizeStyle(false);
      setPreviewEndHour(null);

      const finalEndTimeValue = newHour;
      const currentEndValue = formatHourToNumber(activity.end_time);

      if (finalEndTimeValue === currentEndValue) return;

      const { id, trip_id, created_at, updated_at, status, ...rest } = activity;

      const payload = {
        ...rest,
        end_time: formatHour(finalEndTimeValue),
      };

      await handleUpdateSinglePlan(activity.id, payload);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const Icon: IconType =
    IconsType.find((el) => el.type === activity.type)?.icon ?? MdHiking;

  const showBottomPlus = Boolean(nextEvent);

  useEffect(() => {
    if (mouseResizeStyle) {
      document.body.style.cursor = "ns-resize";
    } else {
      document.body.style.cursor = "default";
    }

    return () => {
      document.body.style.cursor = "default";
    };
  }, [mouseResizeStyle]);

  return (
    <div
      style={{ ...style, height, top, bottom }}
      ref={setNodeRef}
      className={`pointer-events-auto absolute right-2 left-2 rounded-lg shadow ${isUpdating ? "cursor-not-allowed opacity-50" : mouseResizeStyle ? "cursor-ns-resize" : "cursor-move"} ${isDark ? "bg-black/80 text-white" : "bg-white/80 text-black"}`}
    >
      <div {...attributes} {...listeners} className={`h-full w-full px-4 py-2`}>
        <div className="flex items-center gap-3">
          <Icon size={18} />
          <div className="w-full pr-12 text-sm font-semibold">
            <h1 className="line-clamp-1">{activity.title}</h1>
            <h1 className="text-muted-foreground line-clamp-1">
              {activity.location_name}
            </h1>
          </div>
        </div>

        <h1 className="text-muted-foreground absolute top-1 right-2 text-[13px]">
          {formatHour12(activity.start_time)}
        </h1>
        <h1 className="text-muted-foreground absolute right-2 bottom-1 text-[13px]">
          {previewEndHour !== null
            ? formatHour12(formatHour(previewEndHour))
            : formatHour12(activity.end_time)}
        </h1>
      </div>

      <div
        onMouseDown={handleResizeStart}
        className="absolute bottom-0 h-2 w-full cursor-ns-resize bg-transparent"
      />
      {previewEndHour && (
        <div className="absolute right-2 bottom-0 left-2 h-0.5 bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.7)]" />
      )}

      {showTopIcon && topTransport && (
        <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 cursor-default flex-col items-center">
          <div className="rounded-full bg-yellow-400 p-1 text-white">
            {TRANSPORT_MODES_ICONS[topTransport.mode].icon}
          </div>
        </div>
      )}

      {/* Bottom Button */}
      {showBottomPlus && (
        <div
          className={`absolute -bottom-4 left-1/2 z-10 flex -translate-x-1/2 cursor-default flex-col items-center`}
        >
          <button
            onClick={() => onOpenTransport(activity, nextEvent)}
            className={`cursor-pointer rounded-full p-1 ${
              transport
                ? "bg-yellow-400 text-white"
                : isDark
                  ? "bg-black/80 text-white"
                  : "bg-white/80 text-black"
            }`}
          >
            {transport ? (
              TRANSPORT_MODES_ICONS[transport?.mode].icon
            ) : (
              <BsPlusLg />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TripViewCard;
