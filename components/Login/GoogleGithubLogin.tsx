import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { githubLogin, googleLogin, IUser } from "../../auth/authManager";
import {
  authUserFailure,
  authUserSuccess,
} from "../../redux/actions/userActions";
import GitHubIcon from "./GitHubIcon";
import GoogleIcon from "./GoogleIcon";

const GoogleGithubLogin = () => {
  const [usersInfo, setUsersInfo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsersInfo(data.data));
  }, []);
  const dispatch = useDispatch();

  const handleLogin = async (provider: () => Promise<IUser>) => {
    const loadingId = toast.loading("Loading...");

    try {
      const user = await provider();
      toast.dismiss(loadingId);
      toast.success("Login Successfully!");
      dispatch(authUserSuccess(user));

      // sent data to database
        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            imageURL: "",
            githubLink: "",
            location: "",
            bio: "",
          }),
        });
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
