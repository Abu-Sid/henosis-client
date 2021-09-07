import { useRouter } from "next/router";
import React from "react";
import NotFound from "../../pages/404";
import Account from "./SettingsPages/Account";
import Billing from "./SettingsPages/Billing";
import Customization from "./SettingsPages/Customization";
import Profile from "./SettingsPages/Profile";

const SettingsRoute = () => {
  const router = useRouter();
  let path = router?.query?.paths?.[0];
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
