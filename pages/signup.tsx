import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, ILoginData } from "../auth/authManager";
import GoogleGithubLogin from "../components/Login/GoogleGithubLogin";
import LoginForm from "../components/Login/LoginForm";
import {
  authUserFailure,
  authUserRequest,
  authUserSuccess,
} from "../redux/actions/userActions";
import { RootState } from "../redux/reducers";

const SignUp = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { path } = useSelector((state: RootState) => state.routerState);

  const submit = async (data: ILoginData) => {
    dispatch(authUserRequest());

    const { email, password, name } = data;

    try {
      const user = await createUser(email, password, name);
      dispatch(authUserSuccess(user));
      router.replace(path);
    } catch (error) {
      dispatch(authUserFailure(error.message));
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     dispatch(authUserLogout());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        <h1>Create New Account</h1>
        <LoginForm submit={submit} newUser />
        <GoogleGithubLogin />
        <p className="login-bottom">
          Already Have An Account? <Link href="/signin">Sign In</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
