"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTrip } from "@/hooks/useTrip";
import { AiFillDollarCircle } from "react-icons/ai";

const FinanceCard = () => {
  const { selectedTrip } = useTrip();
  if (!selectedTrip) return null;
  return (
    <section className="space-y-5 font-medium">
      {/* Title */}
      <div className="flex items-center gap-3 p-2">
        <AiFillDollarCircle size={20} />
        <span>Finances</span>
      </div>

      <Card className="shadow-none py-3 rounded-2xl min-h-[70vh]">
        <CardContent className="space-y-3 px-3">
          <div className="pb-3 border-b font-semibold text-sm">
            Estimated: <span className="text-muted-foreground">$10,000,00</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center rounded-md">
              <span className="font-semibold text-sm">Lifestyle</span>
              <span className="bg-muted p-2 rounded-md text-sm">Luxurious</span>
            </div>

            <div className="flex justify-between items-center rounded-md">
              <span className="font-semibold text-sm">Currency</span>
              <span className="bg-muted p-2 rounded-md text-sm">INR</span>
            </div>

            <div className="flex justify-between items-center rounded-md">
              <span className="font-semibold text-sm">Budget</span>
              <span className="bg-muted p-2 rounded-md text-sm">{selectedTrip?.budget}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FinanceCard;
