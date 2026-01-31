import { useTrip } from "@/hooks/useTrip";
import { daysGenerator } from "@/lib/date";

// const days = ["10 May, Tuesday", "11 May, Wednesday", "12 May, Thursday", "13 May, Friday"];

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
          <div key={day} className="border-black border-r min-h-screen">
            <header className="bg-black/80 p-2 min-w-80 text-sm whitespace-nowrap">{day}</header>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TripView;
