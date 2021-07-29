import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { githubLogin, googleLogin, IUser } from "../../auth/authManager";
import {
  authUserFailure,
  authUserSuccess,
} from "../../redux/actions/userActions";
import { RootState } from "../../redux/reducers";
import GitHubIcon from "./GitHubIcon";
import GoogleIcon from "./GoogleIcon";

const GoogleGithubLogin = () => {
  const dispatch = useDispatch();

  const handleLogin = async (provider: () => Promise<IUser>) => {
    const loadingId = toast.loading("Loading...");

    try {
      const user = await provider();
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
    <div className="google-github-login">
      <h2>or</h2>
      <button onClick={() => handleLogin(githubLogin)}>
        <GitHubIcon />
        Sign Up With GitHub
      </button>
      <button onClick={() => handleLogin(googleLogin)}>
        <GoogleIcon />
        Sign Up With Google
      </button>
    </div>
  );
};

export default GoogleGithubLogin;
