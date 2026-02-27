"use client";
import { IconType } from "react-icons/lib";

type Props = {
  name: string;
  location: string;
  Icon: IconType;
};

const ActivityCard = ({ name, location, Icon }: Props) => {
  return (
    <div className="flex items-center gap-4 px-5 py-2 border rounded-xl">
      <Icon size={18} />
      <div className="leading-tight">
        <h1 className="font-semibold">{name}</h1>
        <p className="text-muted-foreground">{location}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
