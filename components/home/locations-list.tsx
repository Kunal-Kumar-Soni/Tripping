import { BiSolidLandmark } from "react-icons/bi";
import { MdHiking, MdOutlineRestaurant } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

type SavedLocationsType = {
  id: string;
  title: string;
  address: string;
  category: "restaurant" | "hotel" | "activity";
};

const categoryIconMap = {
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
            <div key={location.id} className="flex items-center gap-4 px-5 py-2 border rounded-xl">
              <Icon size={18} />
              <div className="leading-tight">
                <h1 className="font-semibold">{location.title}</h1>
                <p className="text-muted-foreground">{location.address}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LocationsList;
