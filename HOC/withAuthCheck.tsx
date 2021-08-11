import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingAnimation from "../components/ui/Animation/LoadingAnimation";
import addRouterState from "../redux/actions/routerStateActions";
import { RootState } from "../redux/reducers";

const withAuthCheck = (Component: () => JSX.Element) => {
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

    if (user.email) return <Component />;

    return <LoadingAnimation />;
  };
  return PrivateRoute;
};

export default withAuthCheck;
