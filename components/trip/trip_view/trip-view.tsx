"use client";
import { useState } from "react";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { customCollisionStrategy } from "@/lib/custom-collision";
import { tripFormate } from "@/lib/date";
import {
  formatDate,
  formatHour,
  formatHourToNumber,
  getDays,
} from "@/lib/plan-formate";

import { useActivity } from "@/hooks/useActivity";
import { usePlan } from "@/hooks/usePlan";
import { useTrip } from "@/hooks/useTrip";

import { CreateActivity } from "@/types/activity";

import { ActivityPage } from "../activity/activity-page";
import MapView from "../map_view/map-view";
import ZoomControl from "../zoom-control";
import TripRow from "./trip-row";
import TripViewCard from "./trip-view-card";

export type SelectViewType = "calendar" | "map";

const TripView = () => {
  const [activeDuration, setActiveDuration] = useState<number>(1);
  const [selectView, setSelectView] = useState<SelectViewType>("calendar");

  const { selectedTrip } = useTrip();
  const {
    plans,
    handleUpdateSinglePlan,
    handlePlanActivityToTimeline,
    handlePlanTimelineToActivity,
  } = usePlan();

  const { setMutationType } = useActivity();

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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const activity = active.data.current?.activity;

    if (activity && activity.start_time && activity.end_time) {
      const start = formatHourToNumber(activity.start_time);
      const end = formatHourToNumber(activity.end_time);

      setActiveDuration(end - start);
    } else {
      setActiveDuration(1);
    }
  };

  const isSlotOccupied = (
    date: string,
    start: number,
    end: number,
    ignoreId?: number,
  ) => {
    return plans.some((item) => {
      if (item.id === ignoreId) return false;
      if (formatDate(item.start_date) !== date) return false;

      const itemStart = formatHourToNumber(item.start_time);
      const itemEnd = formatHourToNumber(item.end_time);

      return start < itemEnd && end > itemStart;
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const dragType = active?.data?.current?.type;
    const activity = active?.data?.current?.activity;

    if (!activity || !dragType) return;

    // Drag Timeline → Activity Panel
    if (dragType === "timeline" && over.id === "activity-drop") {
      setMutationType("create");
      const { id, title, location_name, type } = activity;

      const payload: CreateActivity = {
        name: title,
        location: location_name,
        category: type,
      };
      await handlePlanTimelineToActivity(payload, id);
      setMutationType(null);
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

      let finalHour = hourNumber;

      // --- NEW BOUNDARY CHECK ---
      if (finalHour + duration > 24) {
        finalHour = 24 - duration;
      }

      const oldDate = formatDate(activity.start_date);
      const oldHour = formatHourToNumber(activity.start_time);

      if (oldDate === date && oldHour === hourNumber) {
        return;
      }

      const start_time = finalHour;
      const end_time = finalHour + duration;

      if (isSlotOccupied(date, start_time, end_time, activity.id)) {
        return;
      }

      const { id, trip_id, created_at, updated_at, status, ...rest } = activity;

      const payload = {
        ...rest,
        start_date: new Date(date).toISOString(),
        end_date: new Date(date).toISOString(),
        start_time: formatHour(start_time),
        end_time: formatHour(end_time),
      };

      await handleUpdateSinglePlan(activity.id, payload);
      return;
    }

    //Drag Activity → Timeline
    if (dragType === "activity") {
      const [date, hour] = String(over.id).split("|");
      const hourNumber = Number(hour);

      const start_time = hourNumber;
      const end_time = hourNumber + 1;

      if (isSlotOccupied(date, start_time, end_time)) {
        return;
      }

      const { id, created_at, updated_at, user_id, ...rest } = activity;
      const payload = {
        location_name: rest.location,
        type: rest.category,
        title: rest.name,
        start_date: new Date(date).toISOString(),
        end_date: new Date(date).toISOString(),
        start_time: formatHour(start_time),
        end_time: formatHour(end_time),
      };
      await handlePlanActivityToTimeline(payload, id);
      return;
    }
  };

  return (
    <DndContext
      collisionDetection={customCollisionStrategy}
      modifiers={[restrictToWindowEdges]}
      sensors={sensors}
      onDragStart={handleDragStart}
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
              <div
                key={date}
                className="relative min-w-100 shrink-0"
                data-timeline
              >
                <div className="relative">
                  {hours.map((hour) => {
                    const isDark = hour <= 7 || hour >= 19;
                    return (
                      <TripRow
                        key={hour}
                        isDark={isDark}
                        date={date}
                        hour={hour}
                        duration={activeDuration}
                      />
                    );
                  })}

                  {/* events */}
                  <div className="absolute inset-0 pointer-events-none">
                    {plans
                      .filter((item) => formatDate(item.start_date) === date)
                      .sort(
                        (a, b) =>
                          formatHourToNumber(a.start_time) -
                          formatHourToNumber(b.start_time),
                      )
                      .map((item, index, arr) => {
                        const hour = formatHourToNumber(item.start_time);
                        const nextEvent = arr[index + 1];
                        const isDark = hour <= 7 || hour >= 19;

                        return (
                          <TripViewCard
                            key={item.id}
                            activity={item}
                            isDark={isDark}
                            nextEvent={nextEvent}
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
