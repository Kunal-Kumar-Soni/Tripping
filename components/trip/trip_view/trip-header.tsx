"use client";
import { ImMagicWand } from "react-icons/im";
import { AvatarGroupCountExample } from "../../ui/avatar-group-count-example";
import { Button } from "../../ui/button";
import { GoGear } from "react-icons/go";
import Link from "next/link";
import { useTrip } from "@/hooks/useTrip";
import { differenceInDays } from "date-fns";

const TripHeader = () => {
  const { selectedTrip } = useTrip();
  if (!selectedTrip) return null;
  const durations = differenceInDays(selectedTrip?.end_date, selectedTrip?.start_date) + 1;

  return (
    <section className="top-0 right-0 left-100 z-40 fixed">
      {/* Header */}
      <header className="flex justify-between items-center bg-black/80 shadow-[0_1px_0_rgba(0,0,0,0.6),0_6px_12px_rgba(0,0,0,0.3)] px-6 py-4 text-white">
        {/* Left */}
        <div className="w-[40%]">
          <h1 className="font-semibold text-2xl tracking-tight">{selectedTrip?.title}</h1>
        </div>

        {/* Right */}
        <div className="flex justify-between items-center gap-10 w-[60%]">
          <div className="leading-tight">
            <p className="text-white/60 text-sm">Duration</p>
            <p className="font-semibold">{durations} Days</p>
          </div>

          <div className="leading-tight">
            <p className="text-white/60 text-sm">Cost Estimate</p>
            <p className="font-semibold">${selectedTrip?.budget}</p>
          </div>

          <AvatarGroupCountExample person={"4"} />

          <div className="flex gap-2">
            <Button
              size={"icon-lg"}
              className="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 rounded-full transition"
            >
              <ImMagicWand />
            </Button>
            {selectedTrip && (
              <Button
                asChild
                size={"icon-lg"}
                className="flex justify-center items-center border rounded-full transition"
              >
                <Link href={"/setting"}>
                  <GoGear />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>
    </section>
  );
};

export default TripHeader;
