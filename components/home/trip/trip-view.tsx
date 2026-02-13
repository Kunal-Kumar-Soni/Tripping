import ZoomControl from "../zoom-control";
import { SavedLocation } from "../saved-location";

const TripView = () => {
  return (
    <div className="mt-20">
      <SavedLocation />
      <ZoomControl />
    </div>
  );
};

export default TripView;
