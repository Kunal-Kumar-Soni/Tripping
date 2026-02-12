"use client";

import { daysGenerator } from "@/lib/date";
import { SavedLocationCard } from "../saved-location-card";
import ZoomControl from "../zoom-control";
import DayColumn from "./day-column";

const TripView = () => {
  return (
    <section className="mt-18 overflow-y-auto">
      {/* Dates Header */}
      <div className="flex flex-1 text-white"></div>

      {/* Saved Location Card */}
      <SavedLocationCard />
      {/* Zoom Control */}
      <ZoomControl />
    </section>
  );
};

export default TripView;
