import { IUserInfo } from "../../types/user";
import { UserAction, UserGeneralAction } from "./UserAction";

export interface UserReduxState {
  currentUser?: IUserInfo;
  accessToken: string;
}

export const INITIAL_USER_STATE: UserReduxState = {
  currentUser: undefined,
  accessToken: ''
};

const UserReducer = (
  state = INITIAL_USER_STATE,
  action: UserGeneralAction<UserReduxState>,
): UserReduxState => {
  switch (action.type) {
    case UserAction.EDIT_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload.currentUser,
        accessToken: action.payload.accessToken,
      };
    }
    default:
      return state;
  }
};

export default UserReducer;
