import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, compose } from "redux";
import CompanyReducer, { CompanyReduxState } from "./company/CompanyReducer";
import UserReducer, { UserReduxState } from "./user/UserReducer";
import EmployeeReducer, {
  EmployeeReduxState,
} from "./employee/EmployeeReducer";
import JobReducer, { JobReduxState } from "./job/JobReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface RootState {
  user: UserReduxState;
  employee: EmployeeReduxState;
  company: CompanyReduxState;
  job: JobReduxState;
}

const rootReducer = combineReducers({
  user: UserReducer,
  employee: EmployeeReducer,
  company: CompanyReducer,
  job: JobReducer,
});

export const store = configureStore({ reducer: rootReducer });
