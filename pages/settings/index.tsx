import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import { RootState } from "../../redux/reducers";
import { useRouter } from "next/router";
import LoadingAnimation from "../../components/ui/Animation/LoadingAnimation";
const Settings = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const router = useRouter();
  useEffect(() => {
    router.replace("/settings/profile");
  }, [router]);
  return <LoadingAnimation />;
};

export default Settings;
