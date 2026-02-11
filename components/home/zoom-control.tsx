import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { BsCalendar3 } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { CgMathMinus } from "react-icons/cg";
import { IoMapOutline } from "react-icons/io5";
import { useEffect } from "react";
import { getTrips } from "@/services/trips";
import { useAuth } from "@/hooks/useAuth";

const ZoomControl = () => {
  const { user, isLoading } = useAuth();
  useEffect(() => {
    const getData = async () => {
      if (!isLoading && user) {
        const data = await getTrips();
        console.log(data);
      }
    };
    getData();
  }, [user, isLoading]);

  return (
    <Card className="right-6 bottom-5 fixed py-2 w-full max-w-94">
      <CardContent className="flex justify-between items-center px-5">
        {/* Zoom label */}
        <span className="font-medium">Zoom</span>

        {/* Percentage  */}
        <div className="bg-muted px-6 py-3 rounded-full font-semibold text-muted-foreground">
          100%
        </div>

        {/* Minus / Plus */}
        <div className="flex gap-1">
          <Button size="icon-lg" variant="outline" className="rounded-full">
            <CgMathMinus />
          </Button>
          <Button size="icon-lg" variant="outline" className="rounded-full">
            <BsPlusLg />
          </Button>
        </div>

        {/* Divider */}
        <div className="self-stretch -my-2 bg-border w-px" />

        {/* Action icons */}
        <div className="flex gap-1">
          <Button size="icon-lg" className="rounded-full">
            <BsCalendar3 />
          </Button>
          <Button size="icon-lg" variant="outline" className="rounded-full">
            <IoMapOutline />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoomControl;
