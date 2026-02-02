"use client";
import Sidebar from "@/components/home/sidebar";
import TripHeader from "@/components/home/trip/trip-header";
import TripView from "@/components/home/trip/trip-view";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col ml-100 h-screen">
        <TripHeader />
        <TripView />
      </div>
    </div>
  );
}
