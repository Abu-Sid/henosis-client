import React from "react";
import withAuthCheck from "../../HOC/withAuthCheck";
import Sidebar from "../../components/ui/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default withAuthCheck(Dashboard);
