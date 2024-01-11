import { IApiGetCompanyResponse } from "../../types/company";
import { CompanyAction, CompanyGeneralAction } from "./CompanyAction";

export interface CompanyReduxState {
  currentCompany?: IApiGetCompanyResponse;
}

export const INITIAL_COMPANY_STATE: CompanyReduxState = {
  currentCompany: undefined,
};

const CompanyReducer = (
  state = INITIAL_COMPANY_STATE,
  action: CompanyGeneralAction<CompanyReduxState>
): CompanyReduxState => {
  switch (action.type) {
    case CompanyAction.EDIT_CURRENT_COMPANY: {
      return {
        ...state,
        currentCompany: action.payload.currentCompany,
      };
    }
    default:
      return state;
  }
};

export default CompanyReducer;
