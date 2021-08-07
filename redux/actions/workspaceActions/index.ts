import { IAction, IWorkspace } from "./actionInterface";
import ActionType from "./actionTypes";

export const workspaceSuccess = (workspace: IWorkspace): IAction => {
  return {
    type: ActionType.WORKSPACE_SUCCESS,
    payload: workspace,
  };
};

export const workspaceFailure = (error: string): IAction => {
  return {
    type: ActionType.WORKSPACE_FAILURE,
    payload: error,
  };
};
