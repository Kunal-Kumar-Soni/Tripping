import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

type TripRowProps = {
  children?: ReactNode;
  isDark: boolean;
  date: string;
  hour: number;
};

const TripRow = ({ children, isDark, date, hour }: TripRowProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: `${date}|${hour}` });

  return (
    <div
      ref={setNodeRef}
      className={`relative h-15 transition-all 
        ${isDark ? "bg-[#B2B2B2]" : "bg-[#E6E6E6]"}
        ${isOver ? "bg-muted border border-dashed border-blue-500" : ""}
        `}
    >
      {children}
    </div>
  );
};

export default TripRow;
