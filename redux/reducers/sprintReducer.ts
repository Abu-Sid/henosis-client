import { ActionType } from "../actions/sprintActions/actionTypes";
import { IAction, ISprint } from "./../actions/sprintActions/actionInterface";

export interface ISprintState {
  sprint: ISprint;
  loading: boolean;
}

const initialState: ISprintState = {
  sprint: {} as ISprint,
  loading: true,
};

const sprintReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionType.SEND_CURRENT_SPRINT: {
      const newSprint = action.payload || state.sprint;
      return {
        ...state,
        sprint: newSprint,
        loading: false,
      };
    }
    case ActionType.CREATED_SPRINT: {
      const newSprint = state.sprint._id ? state.sprint : action.payload;
      return {
        ...state,
        sprint: newSprint,
      };
    }
    case ActionType.ADDED_TASK: {
      return {
        ...state,
        sprint: { ...state.sprint, tasks: action.payload },
      };
    }
    case ActionType.UPDATE_STATUS: {
      return {
        ...state,
        sprint: { ...state.sprint, status: action.payload },
      };
    }
    case ActionType.SET_EMPTY_SPRINT: {
      return {
        sprint: {} as ISprint,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default sprintReducer;
