"use client";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { HiUsers } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { SidebarModel } from "./sidebar-model";
import { useState } from "react";
import Link from "next/link";
import { dateFormatter } from "@/lib/date";
import { Button } from "../ui/button";
import { useTrip } from "@/hooks/useTrip";

const Sidebar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { trips, loadingTrips, selectedTrip, loadingSelectedTrip, error, selectTrip } = useTrip();

  const filteredTrips = trips?.filter((el) =>
    el.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  console.log(selectedTrip);

  return (
    <section className="fixed space-y-6 p-6 border w-100 min-h-screen">
      {/* Logo */}
      <div className="flex justify-between items-center">
        <Image
          src="/home/Tripping.png"
          alt="tripping-logo"
          loading="eager"
          width={1000}
          height={300}
          className="w-auto h-12"
        />
        <Button variant={"outline"} size="icon-lg" className="rounded-full cursor-pointer">
          <Bell />
        </Button>
      </div>

      {/* Input */}
      <div className="relative w-full">
        <Input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="bg-accent py-5 pr-10 rounded-full"
          placeholder="Text"
        />
        <span className="top-1/2 right-3 absolute text-muted-foreground -translate-y-1/2">
          <Search size={18} />
        </span>
      </div>

      {/* Action */}
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Your Trips</h1>

        <SidebarModel />
      </div>

      {/* Trips List */}
      <div className="flex flex-col gap-0.5">
        {loadingTrips ? (
          <p className="py-4 text-muted-foreground text-sm text-center">Loading trips...</p>
        ) : filteredTrips?.length === 0 ? (
          <p className="py-4 text-muted-foreground text-sm text-center">No trips found.</p>
        ) : (
          filteredTrips?.map((trip) => (
            <div
              key={trip.id}
              onClick={() => {
                if (trip.id !== selectedTrip?.id && !loadingSelectedTrip) {
                  selectTrip(trip.id);
                }
              }}
              className={` flex justify-between  px-4 py-2 border rounded-xl transition-colors hover:bg-accent  ${
                selectedTrip?.id === trip.id
                  ? "bg-muted cursor-default"
                  : loadingSelectedTrip
                    ? "cursor-not-allowed opacity-70"
                    : "hover:bg-accent cursor-pointer"
              }`}
            >
              <div className="leading-snug">
                <h1 className="font-semibold text-sm">{trip.title}</h1>
                <p className="text-muted-foreground text-xs">
                  {dateFormatter(trip.start_date)} - {dateFormatter(trip.end_date)}
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <h1 className="font-semibold text-sm">3</h1>
                <HiUsers />
              </div>
            </div>
          ))
        )}
      </div>

      {/*User Profile */}
      <div className="right-6 bottom-4 left-6 absolute">
        <Link
          href={"/dashboard"}
          className="flex items-center gap-3 hover:bg-accent px-4 py-3 border rounded-xl transition cursor-pointer"
        >
          <FaUser className="text-lg" />
          <h1 className="font-semibold">User Profile</h1>
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
