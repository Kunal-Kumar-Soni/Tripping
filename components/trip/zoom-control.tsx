import { Dispatch, SetStateAction } from "react";
import { BsCalendar3 } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { CgMathMinus } from "react-icons/cg";
import { IoMapOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { SelectViewType } from "./trip_view/trip-view";

type ZoomControlProps = {
  selectView: SelectViewType;
  setSelectView: Dispatch<SetStateAction<SelectViewType>>;
};

const ZoomControl = ({ selectView, setSelectView }: ZoomControlProps) => {
  const handleSelectView = (type: SelectViewType) => {
    setSelectView(type ? type : "map");
  };

  return (
    <Card className="fixed right-6 bottom-5 z-50 w-full max-w-94 py-2">
      <CardContent className="flex items-center justify-between px-5">
        {/* Zoom label */}
        <span className="font-medium">Zoom</span>

        {/* Percentage  */}
        <div className="bg-muted text-muted-foreground rounded-full px-6 py-3 font-semibold">
          100%
        </div>

        {/* Minus / Plus */}
        <div className="flex gap-1">
          <Button
            size="icon-lg"
            variant="outline"
            className="cursor-pointer rounded-full"
          >
            <CgMathMinus />
          </Button>
          <Button
            size="icon-lg"
            variant="outline"
            className="cursor-pointer rounded-full"
          >
            <BsPlusLg />
          </Button>
        </div>

        {/* Divider */}
        <div className="bg-border -my-2 w-px self-stretch" />

        {/* Action icons */}
        <div className="flex gap-1">
          <Button
            onClick={() => handleSelectView("calendar")}
            size="icon-lg"
            variant={selectView === "calendar" ? "default" : "outline"}
            className="cursor-pointer rounded-full"
          >
            <BsCalendar3 />
          </Button>
          <Button
            onClick={() => handleSelectView("map")}
            size="icon-lg"
            variant={selectView === "map" ? "default" : "outline"}
            className="cursor-pointer rounded-full"
          >
            <IoMapOutline />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoomControl;
