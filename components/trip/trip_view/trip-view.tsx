"use client";
import { tripFormate } from "@/lib/date";
import TripViewCard from "./trip-view-card";
import TripRow from "./trip-row";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { usePlan } from "@/hooks/usePlan";
import { formatDate, formatHour, formatHourToNumber, getDays } from "@/lib/plan-formate";
import { useTrip } from "@/hooks/useTrip";

import { CreateActivity } from "@/types/activity";
import { ActivityPage } from "../activity/activity-page";
import ZoomControl from "../zoom-control";
import { useState } from "react";
import MapView from "../map_view/map-view";

export type SelectViewType = "calendar" | "map";

const TripView = () => {
  const [selectView, setSelectView] = useState<SelectViewType>("calendar");
  const { selectedTrip } = useTrip();
  const {
    plans,
    handleUpdateSinglePlan,
    handlePlanActivityToTimeline,
    handlePlanTimelineToActivity,
  } = usePlan();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  if (!selectedTrip) return null;

  const dates = getDays(selectedTrip?.start_date, selectedTrip?.end_date);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const isSlotOccupied = (date: string, hour: number, ignoreId?: number) => {
    return plans.some(
      (item) =>
        formatDate(item.start_date) === date &&
        formatHourToNumber(item.start_time) === hour &&
        item.id !== ignoreId,
    );
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const dragType = active?.data?.current?.type;
    const activity = active?.data?.current?.activity;

    if (!activity || !dragType) return;

    // Drag Timeline → Activity Panel
    if (dragType === "timeline" && over.id === "activity-drop") {
      const { id, title, location_name, type } = activity;

      const payload: CreateActivity = {
        name: title,
        location: location_name,
        category: type,
      };
      await handlePlanTimelineToActivity(payload, id);
      return;
    }

    // Activity → Activity Panel (do nothing)
    if (dragType === "activity" && over.id === "activity-drop") {
      return;
    }

    // Drag Timeline → Timeline
    if (dragType === "timeline") {
      const [date, hour] = String(over.id).split("|");
      const hourNumber = Number(hour);

      const oldStart = formatHourToNumber(activity.start_time);
      const oldEnd = formatHourToNumber(activity.end_time);
      const duration = oldEnd - oldStart;

      // drag alignment fix (top se snap)
      const finalHour = Math.max(0, hourNumber - Math.floor(duration / 2));

      if (isSlotOccupied(date, hourNumber, activity.id)) {
        return;
      }

      const oldDate = formatDate(activity.start_date);
      const oldHour = formatHourToNumber(activity.start_time);

      if (oldDate === date && oldHour === hourNumber) {
        return;
      }

      const start_time = formatHour(finalHour);
      const end_time = formatHour(finalHour + duration);

      const { id, trip_id, created_at, updated_at, status, ...rest } = activity;

      const payload = {
        ...rest,
        start_date: new Date(date).toISOString(),
        end_date: new Date(date).toISOString(),
        start_time,
        end_time,
      };

      await handleUpdateSinglePlan(activity.id, payload);
      return;
    }

    //Drag Activity → Timeline
    if (dragType === "activity") {
      const [date, hour] = String(over.id).split("|");
      const hourNumber = Number(hour);

      if (isSlotOccupied(date, hourNumber)) {
        return;
      }

      const start_time = formatHour(hourNumber);
      const end_time = formatHour(hourNumber + 1);

      const { id, created_at, updated_at, user_id, ...rest } = activity;
      const payload = {
        location_name: rest.location,
        type: rest.category,
        title: rest.name,
        start_date: new Date(date).toISOString(),
        end_date: new Date(date).toISOString(),
        start_time,
        end_time,
      };
      await handlePlanActivityToTimeline(payload, id);
      return;
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      autoScroll
    >
      {selectView === "calendar" ? (
        <>
          {/***** Calendar view *****/}
          <div className="top-18 z-40 sticky flex">
            {dates.map((date) => (
              <div
                key={date}
                className="bg-black/80 p-2 border-r min-w-100 font-medium text-white shrink-0"
              >
                {tripFormate(date)}
              </div>
            ))}
          </div>
          {/* Timeline */}
          <div className="flex mt-18 overflow-hidden">
            {dates.map((date) => (
              <div key={date} className="relative min-w-100 shrink-0" data-timeline>
                <div className="relative">
                  {hours.map((hour) => {
                    const isDark = hour <= 7 || hour >= 19;
                    return <TripRow key={hour} isDark={isDark} date={date} hour={hour} />;
                  })}

                  {/* events */}
                  <div className="absolute inset-0 pointer-events-none">
                    {plans
                      .filter((item) => formatDate(item.start_date) === date)
                      .sort(
                        (a, b) =>
                          formatHourToNumber(a.start_time) - formatHourToNumber(b.start_time),
                      )
                      .map((item, index, arr) => {
                        const hour = formatHourToNumber(item.start_time);
                        const nextEvent = arr[index + 1];
                        const prevEvent = arr[index - 1];
                        const isDark = hour <= 7 || hour >= 19;

                        return (
                          <TripViewCard
                            key={item.id}
                            activity={item}
                            isDark={isDark}
                            nextEvent={nextEvent}
                            prevEvent={prevEvent}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/***** Calendar view *****/}
          <MapView />
        </>
      )}

      <ActivityPage />
      <ZoomControl selectView={selectView} setSelectView={setSelectView} />
    </DndContext>
  );
};

export default TripView;
