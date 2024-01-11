import { ISearchBarForm } from "../../component/SearchBar/SearchBar";
import { JobAction, JobGeneralAction } from "./JobAction";

export interface JobReduxState {
  currentJobQuery?: ISearchBarForm;
}

export const INITIAL_JOB_STATE: JobReduxState = {
  currentJobQuery: undefined,
};

const JobReducer = (
  state = INITIAL_JOB_STATE,
  action: JobGeneralAction<JobReduxState>
): JobReduxState => {
  switch (action.type) {
    case JobAction.EDIT_CURRENT_JOB_QUERY: {
      return {
        ...state,
        currentJobQuery: action.payload.currentJobQuery,
      };
    }
    default:
      return state;
  }
};

export default JobReducer;
