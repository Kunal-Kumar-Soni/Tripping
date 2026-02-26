"use client";
import { IconType } from "react-icons/lib";

type Props = {
  title: string;
  address: string;
  Icon: IconType;
};

const LocationCard = ({ title, address, Icon }: Props) => {
  return (
    <div className="flex items-center gap-4 px-5 py-2 border rounded-xl">
      <Icon size={18} />
      <div className="leading-tight">
        <h1 className="font-semibold">{title}</h1>
        <p className="text-muted-foreground">{address}</p>
      </div>
    </div>
  );
};

export default LocationCard;
