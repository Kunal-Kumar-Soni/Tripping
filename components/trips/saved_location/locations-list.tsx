"use client";
import { BiSolidLandmark } from "react-icons/bi";
import { IconType } from "react-icons/lib";
import { MdHiking, MdOutlineRestaurant } from "react-icons/md";
import LocationCard from "./location-card";

export type SavedLocationsType = {
  id: string;
  title: string;
  address: string;
  category: string;
};

const categoryIconMap: { [key: string]: IconType } = {
  restaurant: MdOutlineRestaurant,
  hotel: BiSolidLandmark,
  activity: MdHiking,
};

const LocationsList = ({ locations }: { locations: SavedLocationsType[] }) => {
  return (
    <section className="space-y-4 w-full">
      <div className="flex flex-col gap-1">
        {locations.map((location) => {
          const Icon = categoryIconMap[location.category];

          return (
            <LocationCard
              key={location.id}
              address={location.address}
              title={location.title}
              Icon={Icon}
            />
          );
        })}
      </div>
    </section>
  );
};

export default LocationsList;
