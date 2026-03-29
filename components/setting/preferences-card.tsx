"use client";

import { LiaSlidersHSolid } from "react-icons/lia";

import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const PreferencesCard = () => {
  return (
    <section className="space-y-5 font-medium">
      {/* Title */}
      <div className="flex items-center gap-3 p-2">
        <LiaSlidersHSolid size={20} />
        <span>Preferences</span>
      </div>

      <Card className="h-full rounded-2xl py-3 shadow-none">
        <CardContent className="space-y-3 px-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 rounded-md">
              <span className="text-sm font-semibold">Lifestyle</span>
              <Select defaultValue="luxurious">
                <SelectTrigger className="bg-muted w-full max-w-70 border-none">
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

            <div className="flex items-center justify-between gap-2 rounded-md">
              <span className="text-sm font-semibold">Currency</span>
              <Select defaultValue="inr">
                <SelectTrigger className="bg-muted w-full max-w-70 border-none">
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
