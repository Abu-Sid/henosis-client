import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createUser, ILoginData } from "../auth/authManager";
import GoogleGithubLogin from "../components/Login/GoogleGithubLogin";
import LoginForm from "../components/Login/LoginForm";
import RedirectUser from "../components/Login/RedirectUser";
import { authUserFailure, authUserSuccess } from "../redux/actions/userActions";

const SignUp = () => {
  const dispatch = useDispatch();

  const submit = async (data: ILoginData) => {
    const loadingId = toast.loading("Loading...");
    const { email, password, name } = data;
    try {
      const user = await createUser(email, password, name);
      toast.dismiss(loadingId);
      toast.success("Account Created Successfully!");
      dispatch(authUserSuccess(user));

      // sent data to database
      fetch("https://intense-peak-24388.herokuapp.com/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          githubLink: "https://github.com/username",
          location: "street no. cityname, countryname",
          bio: "your favorite things",
        }),
      });
      fetch("https://intense-peak-24388.herokuapp.com/userimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          imageURL: "https://i.ibb.co/Cv782Sw/user.png",
        }),
      });
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
          <h1>Create New Account</h1>
          <LoginForm submit={submit} newUser />
          <GoogleGithubLogin />
          <p className="login-bottom">
            Already Have An Account? <Link href="/signin">Sign In</Link>
          </p>
        </div>
      </section>
    </RedirectUser>
  );
};

export default SignUp;
