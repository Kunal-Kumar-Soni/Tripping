"use client";
import { Button } from "@/components/ui/button";
import { BsTrash3 } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LuSlash } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useTrip } from "@/hooks/useTrip";
import { TripDeleteModel } from "./trip-delete-model";

const TripSettingsHeader = () => {
  const { selectedTrip } = useTrip();
  const router = useRouter();
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Button
            onClick={() => router.back()}
            variant={"outline"}
            size={"icon-lg"}
            className="rounded-full"
          >
            <MdArrowBackIos />
          </Button>

          <span className="flex justify-center items-center gap-2 font-semibold">
            <FaGear />
            Trip Settings
          </span>
        </div>
        <TripDeleteModel />
      </div>

      {/* Trip Name */}
      <Card className="shadow-none py-3">
        <CardContent className="flex justify-between items-center px-3">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback></AvatarFallback>
            </Avatar>

            <span className="font-semibold">{selectedTrip?.title}</span>
          </div>

          <Button variant={"outline"} size={"icon-sm"} className="border-foreground rounded-full">
            <LuSlash />
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default TripSettingsHeader;
