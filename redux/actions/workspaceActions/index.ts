import { IAction, IWorkspace } from "./actionInterface";
import ActionType from "./actionTypes";

export const workspaceSuccess = (workspace: IWorkspace): IAction => {
  return {
    type: ActionType.WORKSPACE_SUCCESS,
    payload: workspace,
  };
};
