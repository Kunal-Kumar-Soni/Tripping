import { Bell, Plus, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { HiUsers } from "react-icons/hi";
import { FaUser } from "react-icons/fa";

type TripsType = {
  id: number;
  title: string;
  time: string;
  person: number;
};

const Sidebar = () => {
  const TRIPS: TripsType[] = [
    { id: 1, title: "Wild West", time: "24 Jan '25 - 11 Feb '25", person: 5 },
    { id: 2, title: "Backpacking Vietnam", time: "03 Apr '25 - 05 May '25", person: 2 },
    { id: 3, title: "Family Retreat", time: "11 Nov '25 - 18 Nov '25", person: 4 },
  ];

  return (
    <section className="fixed space-y-6 p-6 border w-100 min-h-screen">
      {/* Logo */}
      <div className="flex justify-between items-center">
        <Image src="/home/Tripping.png" alt="tripping-logo" width={100} height={50} />
        <Bell className="p-2 border rounded-full" size={35} />
      </div>

      {/* Input */}
      <div className="relative w-full">
        <Input className="bg-accent py-5 pr-10 rounded-full" placeholder="Text" />
        <span className="top-1/2 right-3 absolute text-muted-foreground -translate-y-1/2">
          <Search size={18} />
        </span>
      </div>

      {/* Action */}
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Your Trips</h1>
        <Plus className="p-2 border rounded-full" size={35} />
      </div>

      {/* Hardcoded data */}
      <div className="flex flex-col gap-0.5 min-h-[65vh]">
        {TRIPS.map((trip) => (
          <div key={trip.id} className="flex justify-between px-4 py-2 border rounded-xl">
            <div className="leading-snug">
              <h1 className="font-semibold">{trip.title}</h1>
              <p className="text-muted-foreground">{trip.time}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <h1 className="font-semibold">{trip.person}</h1>
              <HiUsers />
            </div>
          </div>
        ))}
      </div>

      {/*User Profile */}
      <div className="flex items-center gap-4 px-4 py-3 border rounded-xl">
        <FaUser />
        <h1 className="font-semibold">User Profile</h1>
      </div>
    </section>
  );
};

export default Sidebar;
