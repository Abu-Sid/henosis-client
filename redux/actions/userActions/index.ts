import { IUser } from "../../../auth/authManager";
import ActionType from "./actionTypes";

export const authUserSuccess = (user: IUser) => {
  return {
    type: ActionType.AUTH_USER_SUCCESS,
    payload: user,
  };
};

export const authUserFailure = (error: string) => {
  return {
    type: ActionType.AUTH_USER_FAILURE,
    payload: error,
  };
};

export const authPrivateLoading = () => {
  return {
    type: ActionType.AUTH_PRIVATE_LOADING,
  };
};

export const authUserLogout = () => {
  return {
    type: ActionType.AUTH_USER_LOGOUT,
  };
};
