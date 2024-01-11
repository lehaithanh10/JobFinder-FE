import { IApiGetEmployeeResponse } from "../../types/employee";
import { EmployeeAction, EmployeeGeneralAction } from "./EmployeeAction";

export interface EmployeeReduxState {
  currentEmployee?: IApiGetEmployeeResponse;
}

export const INITIAL_EMPLOYEE_STATE: EmployeeReduxState = {
  currentEmployee: undefined,
};

const EmployeeReducer = (
  state = INITIAL_EMPLOYEE_STATE,
  action: EmployeeGeneralAction<EmployeeReduxState>
): EmployeeReduxState => {
  switch (action.type) {
    case EmployeeAction.EDIT_CURRENT_EMPLOYEE: {
      return {
        ...state,
        currentEmployee: action.payload.currentEmployee,
      };
    }
    default:
      return state;
  }
};

export default EmployeeReducer;
