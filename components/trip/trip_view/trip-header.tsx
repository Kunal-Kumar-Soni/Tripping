"use client";
import { GoGear } from "react-icons/go";
import { ImMagicWand } from "react-icons/im";

import Link from "next/link";

import { differenceInDays } from "date-fns";

import { useTrip } from "@/hooks/useTrip";

import { AvatarGroupCountExample } from "../../ui/avatar-group-count-example";
import { Button } from "../../ui/button";

const TripHeader = () => {
  const { selectedTrip } = useTrip();
  if (!selectedTrip) return null;
  const durations =
    differenceInDays(selectedTrip?.end_date, selectedTrip?.start_date) + 1;

  return (
    <section className="fixed top-0 right-0 left-100 z-50">
      {/* Header */}
      <header className="bg-header flex items-center justify-between px-6 py-4 text-white shadow-[0_1px_0_rgba(0,0,0,0.6),0_6px_12px_rgba(0,0,0,0.3)]">
        {/* Left */}
        <div className="w-[40%]">
          <h1 className="text-2xl font-semibold tracking-tight">
            {selectedTrip?.title}
          </h1>
        </div>

        {/* Right */}
        <div className="flex w-[60%] items-center justify-between gap-10">
          <div className="leading-tight">
            <p className="text-sm text-white/60">Duration</p>
            <p className="font-semibold">{durations} Days</p>
          </div>

          <div className="leading-tight">
            <p className="text-sm text-white/60">Cost Estimate</p>
            <p className="font-semibold">${selectedTrip?.budget}</p>
          </div>

          <AvatarGroupCountExample person={"4"} />

          <div className="flex gap-2">
            <Button
              size={"icon-lg"}
              className="flex items-center justify-center rounded-full bg-indigo-500 transition hover:bg-indigo-600"
            >
              <ImMagicWand />
            </Button>
            {selectedTrip && (
              <Button
                asChild
                size={"icon-lg"}
                className="flex items-center justify-center rounded-full border transition"
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
