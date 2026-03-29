import { ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";

type TripRowProps = {
  children?: ReactNode;
  isDark: boolean;
  date: string;
  hour: number;
  duration: number;
};

const ROW_HEIGHT = 100;

const TripRow = ({ children, isDark, date, hour, duration }: TripRowProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: `${date}|${hour}` });

  const overflowHours = Math.max(0, hour + duration - 24);
  const topOffset = -(overflowHours * ROW_HEIGHT);

  return (
    <div
      ref={setNodeRef}
      className={`relative h-25 transition-all border
        ${isDark ? "bg-[#B2B2B2]" : "bg-[#E6E6E6]"}`}
    >
      {isOver && (
        <div
          style={{
            height: `${duration * ROW_HEIGHT}px`,
            top: `${topOffset}px`,
            zIndex: 10,
          }}
          className="top-0 right-0 left-0 absolute bg-blue-500/20 border-2 border-blue-500 border-dashed rounded-lg pointer-events-none"
        />
      )}
      {children}
    </div>
  );
};

export default TripRow;
