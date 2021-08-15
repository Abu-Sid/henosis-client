import React from "react";
import SettingsRoute from "../../components/Settings/SettingsRoute";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";

const SettingsPage = () => {
  return (
    <div>
      <SettingsSidebar />
      <SettingsRoute />
    </div>
  );
};

export default SettingsPage;
