import React from "react";
import SettingsRoute from "../../components/Settings/SettingsRoute";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import withAuthCheck from "../../HOC/withAuthCheck";

const SettingsPage = () => {
  return (
    <div>
      <SettingsSidebar />
      <SettingsRoute />
    </div>
  );
};

export default withAuthCheck(SettingsPage);
