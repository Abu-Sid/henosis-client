import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ILoginData, signInUser } from "../auth/authManager";
import GoogleGithubLogin from "../components/Login/GoogleGithubLogin";
import LoginForm from "../components/Login/LoginForm";
import RedirectUser from "../components/Login/RedirectUser";
import { authUserFailure, authUserSuccess } from "../redux/actions/userActions";
import { RootState } from "../redux/reducers";

const SignIn = () => {
  const dispatch = useDispatch();

  const submit = async (data: ILoginData) => {
    const loadingId = toast.loading("Loading...");
    const { email, password } = data;

    try {
      const user = await signInUser(email, password);
      toast.dismiss(loadingId);
      toast.success("Login Successfully!");
      dispatch(authUserSuccess(user));
    } catch (error) {
      toast.dismiss(loadingId);
      toast.error(error.message);
      dispatch(authUserFailure(error.message));
    }
  };

  return (
    <RedirectUser>
      <section className="login-section">
        <div className="inner-login">
          <h1>Sign In</h1>
          <LoginForm submit={submit} />
          <GoogleGithubLogin />
          <p className="login-bottom">
            Don&apos;t Have An Account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </section>
    </RedirectUser>
  );
};

export default SignIn;
