import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

type TripRowProps = {
  children: ReactNode;
  isDark: boolean;
  date: string;
  hour: number;
};

const backgroundShadowStyle: React.CSSProperties = {
  backgroundColor: "rgba(30, 30, 35, 0.35)",
};

const TripRow = ({ children, isDark, date, hour }: TripRowProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: `${date}|${hour}` });

  return (
    <div
      ref={setNodeRef}
      style={isDark ? backgroundShadowStyle : undefined}
      className={`flex items-center p-2 h-20 border-b transition-all
       ${isOver ? "border-2 border-dashed border-blue-400 bg-blue-50/40" : ""}`}
    >
      {children}
    </div>
  );
};

export default TripRow;
