import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

type TripRowProps = {
  children: ReactNode;
  isDark: boolean;
  date: string;
  hour: number;
};

const backgroundShadowStyle: React.CSSProperties = {
  backgroundColor: "#B2B2B2",
};

const TripRow = ({ children, isDark, date, hour }: TripRowProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: `${date}|${hour}` });

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center p-2 h-20 transition-all 
        ${isDark ? "bg-[#B2B2B2]" : "bg-[#E6E6E6]"}
       ${isOver ? "border-dashed border border-blue-400 " : ""}`}
    >
      {children}
    </div>
  );
};

export default TripRow;
