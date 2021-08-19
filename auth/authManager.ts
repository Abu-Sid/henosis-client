import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth;

interface IProfile {
  displayName: string;
  photoURL?: string;
}

export interface ILoginData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IUser {
  name: string;
  email: string;
  emailVerified: boolean;
  photo: string;
}

const profileUpdate = async (name: string, photo?: string) => {
  const user = firebase.auth().currentUser;

  let profile: IProfile = { displayName: name };

  if (photo) {
    profile = { displayName: name, photoURL: photo };
  }

  await user.updateProfile(profile);
};

export const setUser = (user: firebase.User, name?: string) => {
  const { displayName, email, emailVerified, photoURL } = user;
  if (name) {
    profileUpdate(name);
  }
  const newUser: IUser = {
    name: displayName || name,
    email,
    emailVerified,
    photo: photoURL,
  };
  return newUser;
};

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  const res = await auth().createUserWithEmailAndPassword(email, password);
  return setUser(res.user, name);
};

export const signInUser = async (email: string, password: string) => {
  const res = await auth().signInWithEmailAndPassword(email, password);
  return setUser(res.user);
};

export const googleLogin = async () => {
  const provider = new auth.GoogleAuthProvider();
  const res = await auth().signInWithPopup(provider);
  return setUser(res.user);
};

export const githubLogin = async () => {
  const provider = new auth.GithubAuthProvider();
  const res = await auth().signInWithPopup(provider);
  return setUser(res.user);
};

export const logout = async () => {
  await auth().signOut();
};

export const passwordUpdate = async (newPassword: string) => {
  const user = firebase.auth().currentUser;
  await user.updatePassword(newPassword);
};
