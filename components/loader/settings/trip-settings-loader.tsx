import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function TripSettingsLoader() {
  return (
    <Card className="py-3 shadow-none">
      <CardContent className="space-y-4 px-3">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </div>

          <Skeleton className="h-8 w-8 rounded-md" />
        </div>

        {/* Bottom Section */}
        <div className="flex items-stretch gap-6">
          {/* Duration Section */}
          <div className="flex flex-1 flex-col space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-32" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          {/* Budget Section */}
          <div className="flex flex-1 flex-col space-y-3">
            <Skeleton className="h-5 w-20" />

            <Skeleton className="h-4 w-full rounded" />

            <div className="flex justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="space-y-2 text-right">
                <Skeleton className="ml-auto h-4 w-16" />
                <Skeleton className="ml-auto h-4 w-20" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TripSettingsLoader;
