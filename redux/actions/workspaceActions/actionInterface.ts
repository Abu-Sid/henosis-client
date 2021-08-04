import ActionType from "./actionTypes";

export interface IWorkspace {
  _id?: string;
  workspaceName: string;
  type: string;
  companyName?: string;
  companyEmail?: string;
  memberEmail?: string;
  members: {
    isCreator?: boolean;
    name: string;
    email: string;
    emailVerified: boolean;
    photo: string;
  }[];
}

export interface IAction {
  type: ActionType.WORKSPACE_SUCCESS;
  payload: IWorkspace;
}
