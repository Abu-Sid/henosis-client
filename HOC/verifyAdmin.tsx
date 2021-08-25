import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/Dashboard/ErrorMessage";
import LoadingAnimation from "../components/ui/Animation/LoadingAnimation";
import addRouterState from "../redux/actions/routerStateActions";
import { RootState } from "../redux/reducers";

const verifyAdmin = (Component: () => JSX.Element) => {
  const PrivateRoute = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { privateLoading, user } = useSelector(
      (state: RootState) => state.userReducer
    );

    useEffect(() => {
      if (!privateLoading && !user.email) {
        dispatch(addRouterState(router.asPath));
        router.replace("/signin");
      }
    }, [dispatch, router, privateLoading, user.email]);

    // admin section
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const isAdmin = async () => {
        try {
          const res = await fetch(
            "https://intense-peak-24388.herokuapp.com/admin"
          );
          const data = await res.json();
          setAdmins(data.data);
          setLoading(false);
          console.log(data);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      isAdmin();
    }, []);

    if (admins.find((admin) => admin.email === user.email)) {
      return <Component />;
    }
    if (user.email && !loading) {
      return <ErrorMessage />;
    }
    return <LoadingAnimation />;
  };
  return PrivateRoute;
};

export default verifyAdmin;
