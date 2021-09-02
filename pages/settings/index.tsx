import { useRouter } from "next/router";
import React, { useEffect } from "react";
import LoadingAnimation from "../../components/ui/Animation/LoadingAnimation";

const Settings = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/settings/profile");
  }, [router]);

  return <LoadingAnimation />;
};

export default Settings;
