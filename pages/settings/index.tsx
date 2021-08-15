import React from "react";
import { useSelector } from "react-redux";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import { RootState } from "../../redux/reducers";
const Settings = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return <SettingsSidebar />;
};

export default Settings;
