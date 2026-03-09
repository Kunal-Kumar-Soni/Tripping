"use client";
import { tripFormate } from "@/lib/date";
import { ActivityPage } from "../activity/activity-page";
import ZoomControl from "../common/zoom-control";
import TripViewCard from "./trip-view-card";
import TripRow from "./trip-row";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { usePlan } from "@/hooks/usePlan";
import { formatPlan, getDays } from "@/lib/plan-formate";
import { useTrip } from "@/hooks/useTrip";

const TripView = () => {
  const { selectedTrip } = useTrip();
  const { plans } = usePlan();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  if (!selectedTrip) return null;

  const formattedPlans = plans.map(formatPlan);
  const dates = getDays(selectedTrip?.start_date, selectedTrip?.end_date);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;
  //   if (!over) return;
  //   const [date, hour] = String(over.id).split("|");
  //   const hourNumber = Number(hour);

  //   setActivity((prev) => (prev.id === active.id ? { ...prev, date, hour: hourNumber } : prev));
  // };

  return (
    <DndContext sensors={sensors}>
      <div className="flex mt-18">
        {dates.map((date) => (
          <div key={date} className="w-full">
            <div className="top-18 z-50 sticky bg-black/80 p-2 border-r font-medium text-white">
              {tripFormate(date)}
            </div>

            {hours.map((hour) => {
              const isDark = hour <= 7 || hour >= 19;
              const slotPlans = formattedPlans.filter(
                (item) => item.date === date && item.startHour === hour,
              );
              return (
                <TripRow key={hour} isDark={isDark} date={date} hour={hour}>
                  {slotPlans.map((item) => (
                    <TripViewCard key={hour} activity={item} isDark={isDark} />
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
