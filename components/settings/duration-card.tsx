"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTrip } from "@/hooks/useTrip";
import { indianFormat } from "@/lib/date";
import { BsCalendar3 } from "react-icons/bs";
import { differenceInCalendarDays } from "date-fns";

const DurationCard = () => {
  const { selectedTrip } = useTrip();
  if (!selectedTrip) return null;
  const duration = differenceInCalendarDays(selectedTrip?.end_date, selectedTrip?.start_date) + 1;
  return (
    <section className="space-y-5 font-medium">
      {/* Title */}
      <div className="flex items-center gap-3 p-2">
        <BsCalendar3 size={15} />
        <span>Duration</span>
      </div>

      {/* Card */}
      <Card className="shadow-none py-3 rounded-2xl min-h-[70vh]">
        <CardContent className="space-y-3 px-3">
          <div className="pb-3 border-b font-semibold text-sm">
            Trip Duration: <span className="text-muted-foreground">{duration} Days</span>
          </div>

          <div className="space-y-3">
            {/* From */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm">From</span>
              <div className="bg-muted px-6 py-1.5 rounded-md text-sm">
                {indianFormat(selectedTrip?.start_date)}
              </div>
            </div>

            {/* To */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm">To</span>
              <div className="bg-muted px-6 py-1.5 rounded-md text-sm">
                {indianFormat(selectedTrip?.end_date)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DurationCard;
