import { IUserInfo } from "../../types/user";
import { UserReduxState } from "./UserReducer";

export enum UserAction {
  EDIT_CURRENT_USER = 'EDIT_CURRENT_USER',
}

export interface UserGeneralAction<T> {
  type: UserAction;
  payload: T;
}

export const setCurrentUser = ({
  user, accessToken
}: { user?: IUserInfo, accessToken: string }): UserGeneralAction<UserReduxState> => {
  return { type: UserAction.EDIT_CURRENT_USER, payload: { currentUser: user, accessToken } };
};
