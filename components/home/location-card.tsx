"use client";
import { IconType } from "react-icons/lib";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  id: string;
  title: string;
  address: string;
  Icon: IconType;
};

const LocationCard = ({ id, title, address, Icon }: Props) => {
  const { attributes, listeners, setNodeRef, transform, active, isDragging, transition } =
    useSortable({
      id,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: active ? "grabbing" : "grab",
    opacity: isDragging ? 0.7 : 1,
  };
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex items-center gap-4 px-5 py-2 border rounded-xl"
    >
      <Icon size={18} />
      <div className="leading-tight">
        <h1 className="font-semibold">{title}</h1>
        <p className="text-muted-foreground">{address}</p>
      </div>
    </div>
  );
};

export default LocationCard;
