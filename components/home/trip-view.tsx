import { ImMagicWand } from "react-icons/im";
import { AvatarGroupCountExample } from "../ui/avatar-group-count-example";
import { TripsType } from "@/app/page";

type TripViewPropsType = {
  activeTripInfo: TripsType | undefined;
};

const days = ["10 May, Tuesday", "11 May, Wednesday", "12 May, Thursday", "13 May, Friday"];
const TripView = ({ activeTripInfo }: TripViewPropsType) => {
  if (!activeTripInfo) return null;

  return (
    <div className="pl-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center bg-black/80 shadow-[0_1px_0_rgba(0,0,0,0.6),0_6px_12px_rgba(0,0,0,0.3)] px-6 py-4 text-white">
        {/* Left */}
        <div className="w-[40%]">
          <h1 className="font-semibold text-2xl tracking-tight">{activeTripInfo.title}</h1>
        </div>

        {/* Right */}
        <div className="flex justify-between items-center gap-10 w-[60%]">
          <div className="leading-tight">
            <p className="text-white/60 text-sm">Duration</p>
            <p className="font-semibold">{activeTripInfo.duration} Days</p>
          </div>

          <div className="leading-tight">
            <p className="text-white/60 text-sm">Cost Estimate</p>
            <p className="font-semibold">${activeTripInfo.costEstimate}</p>
          </div>

          <AvatarGroupCountExample person={activeTripInfo.person} />

          <button className="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 rounded-full w-9 h-9 transition">
            <ImMagicWand size={18} />
          </button>
        </div>
      </header>

      {/* Dates Header */}
      <div className="grid grid-cols-4 bg-black/80 text-white">
        {days.map((day) => (
          <div key={day} className="p-2 border border-black text-sm">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripView;
