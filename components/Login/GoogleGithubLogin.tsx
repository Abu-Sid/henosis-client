import React from "react";
import { useDispatch } from "react-redux";
import { githubLogin, googleLogin, IUser } from "../../auth/authManager";
import {
  authUserFailure,
  authUserRequest,
  authUserSuccess,
} from "../../redux/actions/userActions";

const GoogleGithubLogin = () => {
  const dispatch = useDispatch();

  const handleLogin = async (provider: () => Promise<IUser>) => {
    dispatch(authUserRequest());

    try {
      const user = await provider();
      dispatch(authUserSuccess(user));
    } catch (error) {
      dispatch(authUserFailure(error.message));
    }
  };

  return (
    <div>
      <br />
      <button onClick={() => handleLogin(googleLogin)}>Google</button>
      <button onClick={() => handleLogin(githubLogin)}>GitHub</button>
    </div>
  );
};

export default GoogleGithubLogin;
