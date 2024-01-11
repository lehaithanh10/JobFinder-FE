import { IApiGetCompanyResponse } from "../../types/company";
import { CompanyReduxState } from "./CompanyReducer";

export enum CompanyAction {
  EDIT_CURRENT_COMPANY = "EDIT_CURRENT_COMPANY",
}

export interface CompanyGeneralAction<T> {
  type: CompanyAction;
  payload: T;
}

export const setCurrentCompany = (
  employee: IApiGetCompanyResponse
): CompanyGeneralAction<CompanyReduxState> => {
  return {
    type: CompanyAction.EDIT_CURRENT_COMPANY,
    payload: { currentCompany: employee },
  };
};
