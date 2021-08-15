import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { auth, setUser } from "../../auth/authManager";
import {
  authPrivateLoading,
  authUserSuccess,
} from "../../redux/actions/userActions";
import { useRoute } from "./Navbar/DesktopNavbar";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(authUserSuccess(setUser(user)));
      }
      dispatch(authPrivateLoading());
    });
    return unsubscribe;
  }, [dispatch]);

  const { pathname } = useRouter();

  useEffect(() => {
    const path = pathname.split("/")[1];
    document.title = `Henosis ${path ? " - " + path : ""}`;
  }, [pathname]);

  const path = useRoute();
  return (
    <>
      <Toaster toastOptions={{ className: "toast" }} />
      {!path.includes("workspaces/[...paths]") &&
        !path.includes("dashboard") &&
        !path.includes("settings") && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
