import Action from "../actions/userActions/actionInterface";
import ActionType from "../actions/userActions/actionTypes";
import { IUser } from "./../../auth/authManager";

export interface UserState {
  user: IUser;
  loading: boolean;
  error: string;
  privateLoading: boolean;
}

const initialState: UserState = {
  user: {} as IUser,
  loading: false,
  error: "",
  privateLoading: true,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.AUTH_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionType.AUTH_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    }
    case ActionType.AUTH_USER_FAILURE: {
      return {
        ...state,
        loading: false,
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
