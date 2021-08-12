import { IUser } from "../../../auth/authManager";
import ActionType from "./actionTypes";

export interface IWorkspace {
  _id?: string;
  workspaceName: string;
  type: string;
  companyName?: string;
  companyEmail?: string;
  memberEmail?: string;
  members: {
    _id?: string;
    isCreator?: boolean;
    name: string;
    email: string;
    emailVerified: boolean;
    photo: string;
  }[];
}

interface SuccessAction {
  type: ActionType.WORKSPACE_SUCCESS;
  payload: IWorkspace;
}

interface FailureAction {
  type: ActionType.WORKSPACE_FAILURE;
  payload: string;
}

interface AddMemberAction {
  type: ActionType.ADD_MEMBERS;
  payload: IUser[];
}

export type IAction = SuccessAction | FailureAction | AddMemberAction;
