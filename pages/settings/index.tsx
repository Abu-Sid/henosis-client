import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import { RootState } from "../../redux/reducers";
import { useRouter } from "next/router";
const Settings = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const router = useRouter();
  useEffect(() => {
    router.replace("/settings/profile");
  }, [router]);
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default Settings;
