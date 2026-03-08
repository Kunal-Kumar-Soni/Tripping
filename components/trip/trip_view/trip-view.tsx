"use client";
import { getDays, tripFormate } from "@/lib/date";
import { ActivityPage } from "../activity/activity-page";
import ZoomControl from "../common/zoom-control";
import TripViewCard, { Activity } from "./trip-view-card";
import TripRow from "./trip-row";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState } from "react";

const activityInfo = {
  id: 10,
  title: "Eiffel Tower",
  date: "2026-04-01",
  hour: 0,
};

const dates = getDays("2026-04-01", "2026-04-04");
const hours = Array.from({ length: 24 }, (_, i) => i);

const TripView = () => {
  const [activity, setActivity] = useState<Activity>(activityInfo);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const [date, hour] = String(over.id).split("|");
    const hourNumber = Number(hour);

    setActivity((prev) => (prev.id === active.id ? { ...prev, date, hour: hourNumber } : prev));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex mt-18">
        {dates.map((date) => (
          <div key={date} className="w-full">
            <div className="top-18 z-50 sticky bg-black/80 p-2 border-r font-medium text-white">
              {tripFormate(date)}
            </div>

            {hours.map((hour) => {
              const isDark = hour <= 7 || hour >= 19;
              return (
                <TripRow key={hour} isDark={isDark} date={date} hour={hour}>
                  {activity?.date === date && activity?.hour === hour && (
                    <TripViewCard activity={activity} isDark={isDark} />
                  )}
                </TripRow>
              );
            })}
          </div>
        ))}

        <ActivityPage />
        <ZoomControl />
      </div>
    </DndContext>
  );
};

export default TripView;
