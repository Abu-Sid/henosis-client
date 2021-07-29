import Action from "../actions/userActions/actionInterface";
import ActionType from "../actions/userActions/actionTypes";
import { IUser } from "./../../auth/authManager";

export interface UserState {
  user: IUser;
  error: string;
  privateLoading: boolean;
}

const initialState: UserState = {
  user: {} as IUser,
  error: "",
  privateLoading: true,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.AUTH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        error: "",
      };
    }
    case ActionType.AUTH_USER_FAILURE: {
      return {
        ...state,
        user: {} as IUser,
        error: action.payload,
      };
    }
    case ActionType.AUTH_PRIVATE_LOADING: {
      return {
        ...state,
        privateLoading: false,
      };
    }
    case ActionType.AUTH_USER_LOGOUT: {
      return {
        ...state,
        user: {} as IUser,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
