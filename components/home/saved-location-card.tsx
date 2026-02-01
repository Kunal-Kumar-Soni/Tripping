import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { CiMap } from "react-icons/ci";

import LocationsList from "./locations-list";

export function SavedLocationCard() {
  return (
    <Card className="top-30 right-6 fixed py-4 w-full max-w-94">
      <CardContent className="px-4">
        <Collapsible className="rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CiMap size={25} />
              <h1 className="font-semibold">Saved Locations</h1>
            </div>
            <CollapsibleTrigger asChild>
              <span className="group">
                <ChevronDownIcon
                  size={35}
                  className="ml-auto p-2 border rounded-full group-data-[state=open]:rotate-180 transition-transform"
                />
              </span>
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
