import { ActivityPage } from "../activity/activity-page";
import ZoomControl from "../common/zoom-control";

const TripView = () => {
  return (
    <div className="mt-20">
      <ActivityPage />
      <ZoomControl />
    </div>
  );
};

export default TripView;
