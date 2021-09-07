import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ILoginData, signInUser } from "../auth/authManager";
import GoogleGithubLogin from "../components/Login/GoogleGithubLogin";
import LoginForm from "../components/Login/LoginForm";
import RedirectUser from "../components/Login/RedirectUser";
import { exit } from "../components/ui/Animation/Animation";
import { authUserFailure, authUserSuccess } from "../redux/actions/userActions";

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
      <motion.section exit={exit} className="login-section">
        <div className="inner-login">
          <h1>Sign In</h1>
          <LoginForm submit={submit} />
          <GoogleGithubLogin />
          <p className="login-bottom">
            Don&apos;t Have An Account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </motion.section>
    </RedirectUser>
  );
};

export default SignIn;
