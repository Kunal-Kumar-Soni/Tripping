import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function TripSettingsLoader() {
  return (
    <Card className="shadow-none py-3">
      <CardContent className="space-y-4 px-3">
        {/* Top Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Skeleton className="rounded-full w-10 h-10" />
            <Skeleton className="w-40 h-5" />
          </div>

          <Skeleton className="rounded-md w-8 h-8" />
        </div>

        {/* Bottom Section */}
        <div className="flex items-stretch gap-6">
          {/* Duration Section */}
          <div className="flex flex-col flex-1 space-y-3">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-32 h-4" />

            <div className="gap-4 grid grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-24 h-4" />
              </div>

              <div className="space-y-2">
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-24 h-4" />
              </div>
            </div>
          </div>

          {/* Budget Section */}
          <div className="flex flex-col flex-1 space-y-3">
            <Skeleton className="w-20 h-5" />

            <Skeleton className="rounded w-full h-4" />

            <div className="flex justify-between">
              <div className="space-y-2">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>

              <div className="space-y-2 text-right">
                <Skeleton className="ml-auto w-16 h-4" />
                <Skeleton className="ml-auto w-20 h-4" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TripSettingsLoader;
