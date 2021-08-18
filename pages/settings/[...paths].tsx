import React from "react";
import SettingsRoute from "../../components/Settings/SettingsRoute";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";

const SettingsPage = () => {
  return (
    <div className="d-container">
      <div className="d-row">
        <div className="col-left">
          <SettingsSidebar />
        </div>
        <div className="col-right">
          <SettingsRoute />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
