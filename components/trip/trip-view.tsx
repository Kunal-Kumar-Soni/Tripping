import { Activity } from "./activity/activity";
import ZoomControl from "./zoom-control";

const TripView = () => {
  return (
    <div className="mt-20">
      <Activity />
      <ZoomControl />
    </div>
  );
};

export default TripView;
