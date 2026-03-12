"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTrip } from "@/hooks/useTrip";
import { EditTripModel } from "./edit-trip-model";
import { indianFormat } from "@/lib/date";
import { differenceInDays } from "date-fns";

const DurationCard = () => {
  const { selectedTrip } = useTrip();

  if (!selectedTrip) return null;

  // hardcoded value
  const estimate = 5000;
  const totalBudget = 10000;
  const percentage = (estimate / totalBudget) * 100;

  //Duration
  const duration = differenceInDays(selectedTrip?.end_date, selectedTrip?.start_date) + 1;

  return (
    <Card className="shadow-none py-3">
      <CardContent className="space-y-2 px-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback></AvatarFallback>
            </Avatar>

            <span className="font-semibold">{selectedTrip?.title}</span>
          </div>

          <EditTripModel />
        </div>

        <div className="flex items-stretch gap-6">
          {/* Duration Section */}
          <div className="flex flex-col flex-1 justify-between">
            <div className="mb-2 font-semibold">
              <h3>Duration</h3>
              <p className="text-muted-foreground text-sm"> {duration} Days</p>
            </div>

            <div className="grid grid-cols-2 font-semibold text-sm">
              <div>
                <p className="text-muted-foreground text-sm">From</p>
                <p className="font-semibold =">{indianFormat(selectedTrip?.start_date)}</p>
              </div>

              <div>
                <p className="text-muted-foreground text-sm">To</p>
                <p className="font-semibold">{indianFormat(selectedTrip?.end_date)}</p>
              </div>
            </div>
          </div>

          {/* Budget Section */}
          <div className="flex flex-col flex-1 justify-between">
            <h3 className="mb-2 font-semibold">Budget</h3>

            <div className="bg-muted mb-2 rounded w-full h-4 overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex justify-between text-sm">
              <div>
                <p className="text-muted-foreground">Estimate</p>
                <p className="font-semibold">${estimate}</p>
              </div>

              <div className="text-right">
                <p className="text-muted-foreground">Budget</p>
                <p className="font-semibold">${totalBudget}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DurationCard;
