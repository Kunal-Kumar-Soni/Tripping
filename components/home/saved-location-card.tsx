import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { CiMap } from "react-icons/ci";

import LocationsList from "./locations-list";
import { Button } from "../ui/button";
import { IoMapOutline } from "react-icons/io5";

export function SavedLocationCard() {
  return (
    <Card className="top-30 right-6 fixed py-2 w-full max-w-94">
      <CardContent className="px-4">
        <Collapsible className="rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <IoMapOutline size={18} />
              <h1 className="font-semibold">Saved Locations</h1>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant={"outline"} size={"icon-lg"} className="group rounded-full">
                <ChevronDownIcon className="group-data-[state=open]:rotate-180 transition-transform" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-col items-start gap-2 pt-4 text-sm">
            <LocationsList />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
