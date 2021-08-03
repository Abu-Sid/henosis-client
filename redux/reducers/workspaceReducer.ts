import {
  IAction,
  IWorkspace,
} from "../actions/workspaceActions/actionInterface";
import ActionType from "../actions/workspaceActions/actionTypes";

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
}

const initialState: IWorkspaceState = {
  workspace: {} as IWorkspace,
  loading: true,
};

const workspaceReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionType.WORKSPACE_SUCCESS: {
      return {
        ...state,
        loading: false,
        workspace: action.payload,
      };
    }
    default:
      return state;
  }
};

export default workspaceReducer;
