import {
  IAction,
  IWorkspace,
} from "../actions/workspaceActions/actionInterface";
import ActionType from "../actions/workspaceActions/actionTypes";

export interface IWorkspaceState {
  workspace: IWorkspace;
  error: string;
}

const initialState: IWorkspaceState = {
  workspace: {} as IWorkspace,
  error: "",
};

const workspaceReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionType.WORKSPACE_SUCCESS: {
      return {
        ...state,
        workspace: action.payload,
        error: "",
      };
    }
    case ActionType.WORKSPACE_FAILURE: {
      return {
        ...state,
        workspace: {} as IWorkspace,
        error: action.payload,
      };
    }
    case ActionType.ADD_MEMBERS: {
      return {
        ...state,
        workspace: { ...state.workspace, members: action.payload },
      };
    }
    default:
      return state;
  }
};

export default workspaceReducer;
