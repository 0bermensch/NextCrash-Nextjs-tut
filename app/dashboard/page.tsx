import Cashflow from "./cashflow";
import RecentTransactions from "./recent-transactions";

const DashboardPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      <Cashflow />
      <RecentTransactions />
    </div>
  );
};

export default DashboardPage;
