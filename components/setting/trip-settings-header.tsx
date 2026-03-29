"use client";
import { useRouter } from "next/navigation";

import { FaGear } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";

import { Button } from "../ui/button";
import { TripDeleteModel } from "./trip-delete-model";

const TripSettingsHeader = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        <Button
          onClick={() => router.push("/")}
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
      {/* Delete Button and Model */}
      <TripDeleteModel />
    </div>
  );
};

export default TripSettingsHeader;
