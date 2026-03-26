import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BsCalendar3 } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { CgMathMinus } from "react-icons/cg";
import { IoMapOutline } from "react-icons/io5";
import { Dispatch, SetStateAction } from "react";
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
    <Card className="right-6 bottom-5 z-50 fixed py-2 w-full max-w-94">
      <CardContent className="flex justify-between items-center px-5">
        {/* Zoom label */}
        <span className="font-medium">Zoom</span>

        {/* Percentage  */}
        <div className="bg-muted px-6 py-3 rounded-full font-semibold text-muted-foreground">
          100%
        </div>

        {/* Minus / Plus */}
        <div className="flex gap-1">
          <Button size="icon-lg" variant="outline" className="rounded-full cursor-pointer">
            <CgMathMinus />
          </Button>
          <Button size="icon-lg" variant="outline" className="rounded-full cursor-pointer">
            <BsPlusLg />
          </Button>
        </div>

        {/* Divider */}
        <div className="self-stretch -my-2 bg-border w-px" />

        {/* Action icons */}
        <div className="flex gap-1">
          <Button
            onClick={() => handleSelectView("calendar")}
            size="icon-lg"
            variant={selectView === "calendar" ? "default" : "outline"}
            className="rounded-full cursor-pointer"
          >
            <BsCalendar3 />
          </Button>
          <Button
            onClick={() => handleSelectView("map")}
            size="icon-lg"
            variant={selectView === "map" ? "default" : "outline"}
            className="rounded-full cursor-pointer"
          >
            <IoMapOutline />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoomControl;
