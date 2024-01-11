import { ISearchBarForm } from "../../component/SearchBar/SearchBar";
import { JobReduxState } from "./JobReducer";

export enum JobAction {
  EDIT_CURRENT_JOB_QUERY = "EDIT_CURRENT_JOB_QUERY",
}

export interface JobGeneralAction<T> {
  type: JobAction;
  payload: T;
}

export const setCurrentJobQuery = (
  jobQuery: ISearchBarForm
): JobGeneralAction<JobReduxState> => {
  return {
    type: JobAction.EDIT_CURRENT_JOB_QUERY,
    payload: { currentJobQuery: jobQuery },
  };
};
