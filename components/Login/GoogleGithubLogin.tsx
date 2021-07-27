import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { githubLogin, googleLogin, IUser } from "../../auth/authManager";
import {
  authUserFailure,
  authUserRequest,
  authUserSuccess,
} from "../../redux/actions/userActions";
import { RootState } from "../../redux/reducers";
import GitHubIcon from "./GitHubIcon";
import GoogleIcon from "./GoogleIcon";

const GoogleGithubLogin = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { path } = useSelector((state: RootState) => state.routerState);

  const handleLogin = async (provider: () => Promise<IUser>) => {
    dispatch(authUserRequest());

    try {
      const user = await provider();
      dispatch(authUserSuccess(user));
      router.replace(path);
    } catch (error) {
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
8;
