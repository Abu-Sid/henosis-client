import { IUser } from "./../../../auth/authManager";
import ActionType from "./actionTypes";

interface SuccessAction {
  type: ActionType.AUTH_USER_SUCCESS;
  payload: IUser;
}

interface FailureAction {
  type: ActionType.AUTH_USER_FAILURE;
  payload: string;
}

interface LoadingAction {
  type: ActionType.AUTH_PRIVATE_LOADING;
}

interface LogoutAction {
  type: ActionType.AUTH_USER_LOGOUT;
}

type Action = SuccessAction | FailureAction | LoadingAction | LogoutAction;

export default Action;
