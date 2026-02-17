import TripSettingsHeader from "./trip-settings-header";
import DurationCard from "./duration-card";
import FinanceCard from "./finances-card";
import MembersCard from "./members-card";

const TripSettings = () => {
  return (
    <section className="space-y-8">
      <TripSettingsHeader />

      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        <DurationCard />
        <FinanceCard />
        <MembersCard />
      </div>
    </section>
  );
};

export default TripSettings;
