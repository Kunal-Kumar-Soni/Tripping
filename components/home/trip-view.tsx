const days = ["10 May, Tuesday", "11 May, Wednesday", "12 May, Thursday", "13 May, Friday"];

const TripView = () => {
  return (
    <section>
      {/* Dates Header */}
      <div className="grid grid-cols-4 bg-black/80 text-white">
        {days.map((day) => (
          <div key={day} className="p-2 border border-black text-sm">
            {day}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TripView;
