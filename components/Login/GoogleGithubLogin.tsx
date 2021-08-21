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
  const dispatch = useDispatch();

  const handleLogin = async (provider: () => Promise<IUser>) => {
    const loadingId = toast.loading("Loading...");

    try {
      const user = await provider();
      toast.dismiss(loadingId);
      toast.success("Login Successfully!");
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
          imageURL: "https://i.ibb.co/Cv782Sw/user.png",
          githubLink: "https://github.com/username",
          location: "street no. cityname, countryname",
          bio: "your favorite things",
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
