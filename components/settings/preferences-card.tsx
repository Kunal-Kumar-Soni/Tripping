"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTrip } from "@/hooks/useTrip";
import { LiaSlidersHSolid } from "react-icons/lia";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const PreferencesCard = () => {
  const { selectedTrip } = useTrip();
  if (!selectedTrip) return null;
  return (
    <section className="space-y-5 font-medium">
      {/* Title */}
      <div className="flex items-center gap-3 p-2">
        <LiaSlidersHSolid size={20} />
        <span>Preferences</span>
      </div>

      <Card className="shadow-none py-3 rounded-2xl min-h-[56vh]">
        <CardContent className="space-y-3 px-3">
          <div className="space-y-3">
            <div className="flex justify-between items-center rounded-md">
              <span className="font-semibold text-sm">Lifestyle</span>
              <Select defaultValue="luxurious">
                <SelectTrigger className="bg-muted border-none w-full max-w-70">
                  <SelectValue placeholder="Select lifestyle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="luxurious">Luxurious</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center rounded-md">
              <span className="font-semibold text-sm">Currency</span>
              <Select defaultValue="inr">
                <SelectTrigger className="bg-muted border-none w-full max-w-70">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="inr">INR</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PreferencesCard;
