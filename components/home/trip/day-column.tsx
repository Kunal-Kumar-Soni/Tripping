import DayTimeline from "./day-timeline";

const DayColumn = ({ day }: { day: string }) => {
  return (
    <div className="relative flex flex-col border-black border-r min-w-80">
      <header className="top-0 z-30 sticky bg-black/80 p-3 border-white/10 border-b text-white text-sm">
        {day}
      </header>

      <div className="flex-1">
        <DayTimeline />
      </div>
    </div>
  );
};

export default DayColumn;
