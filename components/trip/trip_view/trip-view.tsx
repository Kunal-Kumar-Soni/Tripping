"use client";
import { tripFormate } from "@/lib/date";
import { ActivityPage } from "../activity/activity-page";
import ZoomControl from "../common/zoom-control";
import TripViewCard from "./trip-view-card";
import TripRow from "./trip-row";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { usePlan } from "@/hooks/usePlan";
import { formatDate, formatHour, formatHourToNumber, getDays } from "@/lib/plan-formate";
import { useTrip } from "@/hooks/useTrip";

const TripView = () => {
  const { selectedTrip } = useTrip();
  const { plans, handleUpdateSinglePlan } = usePlan();

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const planData = active?.data?.current?.activity;
    if (!planData) return;

    const [date, hour] = String(over.id).split("|");
    const hourNumber = Number(hour);

    const oldDate = formatDate(planData.start_date);
    const oldHour = formatHourToNumber(planData.start_time);

    if (oldDate === date && oldHour === hourNumber) {
      return;
    }

    const start_time = formatHour(hourNumber);
    const end_time = formatHour(hourNumber + 1);

    const { id, trip_id, created_at, updated_at, status, ...rest } = planData;

    const payload = {
      ...rest,
      start_date: new Date(date).toISOString(),
      end_date: new Date(date).toISOString(),
      start_time,
      end_time,
    };

    await handleUpdateSinglePlan(planData.id, payload);
  };

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
              const slotPlans = plans.filter(
                (item) =>
                  formatDate(item.start_date) === date &&
                  formatHourToNumber(item.start_time) === hour,
              );
              return (
                <TripRow key={hour} isDark={isDark} date={date} hour={hour}>
                  {slotPlans.map((item) => (
                    <TripViewCard key={item.id} activity={item} isDark={isDark} />
                  ))}
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
