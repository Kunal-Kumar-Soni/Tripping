import DashboardHeader from "./dashboard-header";
import DocumentsCard from "./documents-card";
import PaymentMethodsCard from "./payment-method-card";
import UserInfoCard from "./user-info-card";

const Dashboard = () => {
  return (
    <section className="space-y-8">
      <DashboardHeader />

      {/* Content Overview */}
      <UserInfoCard />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <DocumentsCard />
        <PaymentMethodsCard />
      </div>
    </section>
  );
};

export default Dashboard;
