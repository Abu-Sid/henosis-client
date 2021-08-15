import React from "react";
import { useRouter } from "next/router";
import Profile from "./SettingsPages/Profile";
import Account from "./SettingsPages/Account";
import Billing from "./SettingsPages/Billing";
import Customization from "./SettingsPages/Customization";
import NotFound from "../../pages/404";

const SettingsRoute = () => {
  const [, path] = useRouter().query.paths;
  switch (path) {
    case "profile":
      return <Profile />;
    case "account":
      return <Account />;
    case "customization":
      return <Customization />;
    case "billing":
      return <Billing />;
    default:
      return <NotFound />;
  }
};

export default SettingsRoute;
