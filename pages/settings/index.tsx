import React from "react";
import { useSelector } from "react-redux";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import { RootState } from "../../redux/reducers";
const Settings = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default Settings;
