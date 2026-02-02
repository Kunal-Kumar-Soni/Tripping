import { useTrip } from "@/hooks/useTrip";
import { daysGenerator } from "@/lib/date";
import { SavedLocationCard } from "../saved-location-card";
import ZoomControl from "../zoom-control";
import DayColumn from "./day-column";

const TripView = () => {
  const { activeTripInfo } = useTrip();

  if (!activeTripInfo) return null;

  const { startDate, duration } = activeTripInfo;
  const days = daysGenerator(startDate, duration);

  return (
    <section className="mt-18 overflow-y-auto">
      {/* Dates Header */}
      <div className="flex flex-1 text-white">
        {days.map((day) => (
          <DayColumn key={day} day={day} />
        ))}
      </div>

      {/* Saved Location Card */}
      <SavedLocationCard />
      {/* Zoom Control */}
      <ZoomControl />
    </section>
  );
};

export default TripView;
