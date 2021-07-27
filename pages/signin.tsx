import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ILoginData, signInUser } from "../auth/authManager";
import GoogleGithubLogin from "../components/Login/GoogleGithubLogin";
import LoginForm from "../components/Login/LoginForm";
import {
  authUserFailure,
  authUserRequest,
  authUserSuccess,
} from "../redux/actions/userActions";
import { RootState } from "../redux/reducers";

const Signin = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { path } = useSelector((state: RootState) => state.routerState);

  const submit = async (data: ILoginData) => {
    dispatch(authUserRequest());

    const { email, password } = data;

    try {
      const user = await signInUser(email, password);
      dispatch(authUserSuccess(user));
      router.replace(path);
    } catch (error) {
      dispatch(authUserFailure(error.message));
    }
  };

  const { user, privateLoading } = useSelector(
    (state: RootState) => state.userReducer
  );

  if (privateLoading) return <h1>Loading...</h1>;

  if (user.email) {
    router.replace("/");
  }

  return (
    <section className="login-section">
      <div className="inner-login">
        <h1>Sign In</h1>
        <LoginForm submit={submit} />
        <GoogleGithubLogin />
      </div>
    </section>
  );
};

export default Signin;
