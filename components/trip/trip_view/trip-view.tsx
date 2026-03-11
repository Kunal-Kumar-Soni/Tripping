"use client";
import { tripFormate } from "@/lib/date";
import { ActivityPage } from "../activity/activity-page";
import ZoomControl from "../common/zoom-control";
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
import { Spinner2 } from "@/components/ui/spinner";
import { CreateActivity } from "@/types/activity";

const TripView = () => {
  const { selectedTrip } = useTrip();
  const {
    plans,
    handleUpdateSinglePlan,
    handlePlanActivityToTimeline,
    handlePlanTimelineToActivity,
    loadingPlans,
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
      const { id, ...rest } = activity;

      const payload: CreateActivity = {
        name: rest.title,
        location: rest.address,
        category: rest.type,
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

      if (isSlotOccupied(date, hourNumber, activity.id)) {
        return;
      }

      const oldDate = formatDate(activity.start_date);
      const oldHour = formatHourToNumber(activity.start_time);

      if (oldDate === date && oldHour === hourNumber) {
        return;
      }

      const start_time = formatHour(hourNumber);
      const end_time = formatHour(hourNumber + 1);

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
        address: rest.location,
        type: rest.category,
        title: rest.name,
        order_index: 0,
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
    <DndContext collisionDetection={closestCenter} sensors={sensors} onDragEnd={handleDragEnd}>
      {loadingPlans ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner2 className="w-20 h-20 text-blue-600" />
        </div>
      ) : (
        <div className="flex mt-18">
          {dates.map((date) => (
            <div key={date} className="relative w-full" data-timeline>
              <div className="top-18 z-50 sticky bg-black/80 p-2 border-r font-medium text-white">
                {tripFormate(date)}
              </div>

              <div className="relative">
                {/* rows */}
                {hours.map((hour) => {
                  const isDark = hour <= 7 || hour >= 19;
                  return <TripRow key={hour} isDark={isDark} date={date} hour={hour} />;
                })}

                {/* events */}
                <div className="absolute inset-0 pointer-events-none">
                  {plans
                    .filter((item) => formatDate(item.start_date) === date)
                    .map((item) => {
                      const hour = formatHourToNumber(item.start_time);
                      const isDark = hour <= 7 || hour >= 19;

                      return <TripViewCard key={item.id} activity={item} isDark={isDark} />;
                    })}
                </div>
              </div>
            </div>
          ))}

          <ActivityPage />
          <ZoomControl />
        </div>
      )}
    </DndContext>
  );
};

export default TripView;
