import React from "react";
import DashboardHeader from "./dashboard-header";
import Documents from "./documents";
import PaymentMethods from "./payment-method";

const Dashboard = () => {
  return (
    <section className="space-y-8">
      <DashboardHeader />

      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        <Documents />
        <PaymentMethods />
      </div>
    </section>
  );
};

export default Dashboard;
