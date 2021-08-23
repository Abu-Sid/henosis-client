import React from "react";
import withAuthCheck from "../../HOC/withAuthCheck";
import AdminSidebar from "../../components/Dashboard/AdminSidebar";

const Dashboard = () => {
  return (
    <div>
      <AdminSidebar/>
    </div>
  );
};

export default withAuthCheck(Dashboard);
