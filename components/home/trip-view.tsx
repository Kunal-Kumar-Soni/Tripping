import { useTrip } from "@/hooks/useTrip";
import { daysGenerator } from "@/lib/date";
import { SavedLocationCard } from "./saved-location-card";

const TripView = () => {
  const { activeTripInfo } = useTrip();

  if (!activeTripInfo) return null;

  const { startDate, duration } = activeTripInfo;
  const days = daysGenerator(startDate, duration);

  return (
    <section>
      {/* Dates Header */}
      <div className="flex flex-1 overflow-x-scroll text-white">
        {days.map((day) => (
          <div key={day} className="min-h-[90vh]">
            <header className="bg-black/80 p-2 border-black border-r min-w-80 text-sm whitespace-nowrap">
              {day}
            </header>
          </div>
        ))}
      </div>

      {/* Saved Locations */}
      <SavedLocationCard />
    </section>
  );
};

export default TripView;
