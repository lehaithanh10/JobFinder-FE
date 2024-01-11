import { EIdentifyType, EJobFinderRole } from "../enum-types";

export interface IApiLoginResponse {
  userId: string;
  identifier: string;
  identifierType: EIdentifyType;
  role: EJobFinderRole;
  accessToken: string;
  id: string;
}

export interface IApiRegisterResponse extends IApiLoginResponse {}
