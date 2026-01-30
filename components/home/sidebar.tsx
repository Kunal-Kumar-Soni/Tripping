import { Bell, Plus, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { HiUsers } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { TRIPS, TripsType } from "@/app/page";
import { SidebarModel } from "./sidebar-model";
import { useState } from "react";

type sidebarPropsType = {
  activeTripsId: number;
  setActiveTripsId: React.Dispatch<number>;
};

const Sidebar = ({ activeTripsId, setActiveTripsId }: sidebarPropsType) => {
  const [searchData, setSearchData] = useState<string>("");

  const filteredTripData: TripsType[] = TRIPS.filter((trip) =>
    trip.title.toLowerCase().includes(searchData.toLowerCase()),
  );

  return (
    <section className="fixed space-y-6 p-6 border w-100 min-h-screen">
      {/* Logo */}
      <div className="flex justify-between items-center">
        <Image src="/home/Tripping.png" alt="tripping-logo" width={100} height={50} />
        <Bell className="p-2 border rounded-full" size={35} />
      </div>

      {/* Input */}
      <div className="relative w-full">
        <Input
          onChange={(e) => setSearchData(e.target.value)}
          value={searchData}
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

      {/* Hardcoded data */}
      <div className="flex flex-col gap-0.5">
        {filteredTripData.map((trip) => (
          <div
            key={trip.id}
            onClick={() => setActiveTripsId(trip.id)}
            className={` flex justify-between  px-4 py-2 border rounded-xl transition-colors cursor-pointer ${activeTripsId === trip.id ? "bg-muted" : "hover:bg-accent"}`}
          >
            <div className="leading-snug">
              <h1 className="font-semibold text-sm">{trip.title}</h1>
              <p className="text-muted-foreground text-xs">{trip.time}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <h1 className="font-semibold text-sm">{trip.person}</h1>
              <HiUsers />
            </div>
          </div>
        ))}
      </div>

      {/*User Profile */}
      <div className="right-6 bottom-4 left-6 absolute">
        <div className="flex items-center gap-3 hover:bg-accent px-4 py-3 border rounded-xl transition cursor-pointer">
          <FaUser className="text-lg" />
          <h1 className="font-semibold">User Profile</h1>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
