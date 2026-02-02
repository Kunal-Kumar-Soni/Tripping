const DAY_START = 1; //1 AM
const DAY_END = 24; //12 AM
const HOUR_HEIGHT = 80; //px

const DayTimeline = () => {
  return (
    <div
      className="relative"
      style={{
        height: (DAY_END - DAY_START) * HOUR_HEIGHT,
      }}
    />
  );
};

export default DayTimeline;
