import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

interface IProps {
  children: JSX.Element;
}

const RedirectUser = ({ children }: IProps) => {
  const { user, privateLoading } = useSelector(
    (state: RootState) => state.userReducer
  );

  const { path } = useSelector((state: RootState) => state.routerState);

  const router = useRouter();

  useEffect(() => {
    if (!privateLoading && user.email) {
      router.replace(path);
    }
  }, [privateLoading, user, router, path]);

  if (!privateLoading && !user.email) return children;

  return <h1>Loading...</h1>;
};

export default RedirectUser;
