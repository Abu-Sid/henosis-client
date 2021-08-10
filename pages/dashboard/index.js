import React from "react";
import withAuthCheck from "../../HOC/withAuthCheck";
import SideBar from "../../components/Dashboard/SideBar";

const Dashboard = () => {
  return (
    <div>
      <SideBar />
    </div>
  );
};

export default withAuthCheck(Dashboard);
