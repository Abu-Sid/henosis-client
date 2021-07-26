import React from "react";
import { useDispatch } from "react-redux";
import { ILoginData, signInUser } from "../auth/authManager";
import GoogleGithubLogin from "../components/Login/GoogleGithubLogin";
import LoginForm from "../components/Login/LoginForm";
import {
  authUserFailure,
  authUserRequest,
  authUserSuccess,
} from "../redux/actions/userActions";

const Signin = () => {
  const dispatch = useDispatch();

  const submit = async (data: ILoginData) => {
    dispatch(authUserRequest());

    const { email, password } = data;

    try {
      const user = await signInUser(email, password);
      dispatch(authUserSuccess(user));
    } catch (error) {
      dispatch(authUserFailure(error.message));
    }
  };

  return (
    <section className="signin-section">
      <h1>Sign In</h1>
      <LoginForm submit={submit} />
      <GoogleGithubLogin />
    </section>
  );
};

export default Signin;
