import { SavedLocation } from "../saved_location/saved-location";
import ZoomControl from "../zoom-control";

const TripView = () => {
  return (
    <div className="mt-20">
      <SavedLocation />
      <ZoomControl />
    </div>
  );
};

export default TripView;
