import { useState } from "react";
import { BiSolidLandmark } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import { MdHiking, MdOutlineRestaurant } from "react-icons/md";
import { Button } from "../ui/button";

export const locationsData = [
  {
    id: 1,
    label: "Restaurant",
    icon: MdOutlineRestaurant,
    addresses: ["Address 1", "Address 2", "Address 3"],
  },
  {
    id: 2,
    label: "Hotel",
    icon: BiSolidLandmark,
    addresses: ["Address 1", "Address 2", "Address 3"],
  },
  {
    id: 3,
    label: "Travel",
    icon: MdHiking,
    addresses: ["Address 1", "Address 2", "Address 3"],
  },
];

const buttonsIcon = [
  { id: 1, icon: MdOutlineRestaurant },
  { id: 2, icon: BiSolidLandmark },
  { id: 3, icon: MdHiking },
];

const LocationsList = () => {
  const [isActivated, setIsActivated] = useState(1);

  const activeLocation = locationsData.find((location) => location.id === isActivated);
  return (
    <section className="space-y-4 w-full">
      <div className="flex flex-col gap-2">
        {activeLocation?.addresses.map((address, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-2 border rounded-xl">
            <activeLocation.icon size={18} />
            <div className="leading-tight">
              <h1 className="font-semibold">{activeLocation.label}</h1>
              <p className="text-muted-foreground">{address}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-center items-center gap-2 w-full">
        {buttonsIcon.map((btnInfo, i) => (
          <Button
            key={i}
            onClick={() => setIsActivated(btnInfo.id)}
            variant={isActivated === btnInfo.id ? "default" : "outline"}
            size={"icon-lg"}
            className="rounded-full"
          >
            <btnInfo.icon />
          </Button>
        ))}
      </div>

      <IoMenu className="mx-auto" size={20} />
    </section>
  );
};

export default LocationsList;
