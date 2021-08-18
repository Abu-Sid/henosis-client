import React from "react";
import Account from "../components/Settings/SettingsPages/Account";
import Profile from "../components/Settings/SettingsPages/Profile";

const form = () => {
  return (
    <div className="Setting">
      <Profile />
      <Account />
    </div>
  );
};

export default form;
