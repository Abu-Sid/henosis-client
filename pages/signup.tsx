import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, ILoginData, logout } from "../auth/authManager";
import GoogleGithubLogin from "../components/Login/GoogleGithubLogin";
import LoginForm from "../components/Login/LoginForm";
import {
  authUserFailure,
  authUserLogout,
  authUserRequest,
  authUserSuccess,
} from "../redux/actions/userActions";
import { RootState } from "../redux/reducers";

const Signup = () => {
  const dispatch = useDispatch();

  const submit = async (data: ILoginData) => {
    dispatch(authUserRequest());

    const { email, password, name } = data;

    try {
      const user = await createUser(email, password, name);
      dispatch(authUserSuccess(user));
    } catch (error) {
      dispatch(authUserFailure(error.message));
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(authUserLogout());
    } catch (error) {
      console.log(error);
    }
  };

  const { user, error } = useSelector((state: RootState) => state.userReducer);
  console.log(user, error);

  return (
    <section className="signup-section">
      <h1>Sign Up</h1>
      <LoginForm submit={submit} newUser />
      <GoogleGithubLogin />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

export default Signup;
