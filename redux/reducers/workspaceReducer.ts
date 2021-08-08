import {
  IAction,
  IWorkspace,
} from "../actions/workspaceActions/actionInterface";
import ActionType from "../actions/workspaceActions/actionTypes";

export interface IWorkspaceState {
  workspace: IWorkspace;
  loading: boolean;
  error: string;
}

const initialState: IWorkspaceState = {
  workspace: {} as IWorkspace,
  loading: true,
  error: "",
};

const workspaceReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionType.WORKSPACE_SUCCESS: {
      return {
        ...state,
        loading: false,
        workspace: action.payload,
        error: "",
      };
    }
    case ActionType.WORKSPACE_FAILURE: {
      return {
        ...state,
        loading: false,
        workspace: {} as IWorkspace,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default workspaceReducer;
