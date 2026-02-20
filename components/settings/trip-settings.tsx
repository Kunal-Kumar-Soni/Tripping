import TripSettingsHeader from "./trip-settings-header";
import MembersCard from "./members-card";
import PreferencesCard from "./preferences-card";
import DurationCard from "./duration-card";

const TripSettings = () => {
  return (
    <section className="space-y-8">
      <TripSettingsHeader />

      {/* Content Overview */}
      <DurationCard />
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <PreferencesCard />
        <MembersCard />
      </div>
    </section>
  );
};

export default TripSettings;
