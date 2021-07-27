import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import addRouterState from "../redux/actions/routerStateActions";
import { RootState } from "../redux/reducers";

const withAuthCheck = (Component: React.FC<{}>) => {
  return () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const { privateLoading, user } = useSelector(
      (state: RootState) => state.userReducer
    );

    if (privateLoading) return <h1>Loading...</h1>;

    if (user.email) return <Component />;

    useEffect(() => {
      dispatch(addRouterState(router.asPath));
      router.replace("/signin");
    }, [dispatch, router]);

    return "Loading...";
  };
};

export default withAuthCheck;
