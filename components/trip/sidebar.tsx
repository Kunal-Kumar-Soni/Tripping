"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";

import Image from "next/image";
import Link from "next/link";

import { Bell, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner2 } from "@/components/ui/spinner";
import { useTrip } from "@/hooks/useTrip";
import { dateFormatter } from "@/lib/date";

import { TripFormModel } from "./trip-form-model";

const Sidebar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { trips, loadingTrips, selectedTrip, loadingSelectedTrip, selectTrip } =
    useTrip();

  const filteredTrips = trips?.filter((el) =>
    el.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <section className="fixed z-50 min-h-screen w-100 space-y-6 border bg-white p-6">
      {/* Logo */}
      <div className="flex items-center justify-between">
        <Image
          src="/home/Tripping.png"
          alt="tripping-logo"
          loading="eager"
          width={1000}
          height={300}
          className="h-12 w-auto"
        />
        <Button
          variant={"outline"}
          size="icon-lg"
          className="cursor-pointer rounded-full"
        >
          <Bell />
        </Button>
      </div>

      {/* Input */}
      <div className="relative w-full">
        <Input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="bg-accent rounded-full py-5 pr-10"
          placeholder="Text"
        />
        <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
          <Search size={18} />
        </span>
      </div>

      {/* Action */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your Trips</h1>

        {/* <SidebarModel /> */}
        <TripFormModel mode="create" />
      </div>

      {/* Trips List */}
      <div className="flex flex-col gap-0.5">
        {loadingTrips ? (
          <p className="text-muted-foreground py-4">
            <Spinner2 className="mx-auto h-6 w-6 text-blue-600" />
          </p>
        ) : filteredTrips?.length === 0 ? (
          <p className="text-muted-foreground py-4 text-center text-sm">
            No trips found.
          </p>
        ) : (
          filteredTrips?.map((trip) => (
            <div
              key={trip.id}
              onClick={() => {
                if (trip.id !== selectedTrip?.id && !loadingSelectedTrip) {
                  selectTrip(trip.id);
                }
              }}
              className={`hover:bg-accent flex justify-between rounded-xl border px-4 py-2 transition-colors ${
                selectedTrip?.id === trip.id
                  ? "bg-muted cursor-default"
                  : loadingSelectedTrip
                    ? "cursor-not-allowed opacity-70"
                    : "hover:bg-accent cursor-pointer"
              }`}
            >
              <div className="leading-snug">
                <h1 className="text-sm font-semibold">{trip.title}</h1>
                <p className="text-muted-foreground text-xs">
                  {dateFormatter(trip.start_date)} -{" "}
                  {dateFormatter(trip.end_date)}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <h1 className="text-sm font-semibold">1</h1>
                <HiUsers />
              </div>
            </div>
          ))
        )}
      </div>

      {/*User Profile */}
      <div className="absolute right-6 bottom-5 left-6">
        <Link
          href={"/dashboard"}
          className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition"
        >
          <FaUser className="text-lg" />
          <h1 className="font-semibold">User Profile</h1>
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
