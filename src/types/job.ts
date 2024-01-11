import { IApiGetCompanyResponse } from "./company";

export type JobKeyWord = {
  title: string;
  score?: string;
};

export interface JobInfo {
  id: string;
  title: string;
  salary: number;
  active: boolean;
  companyId: string;
  description: string;
  requirement: string;
  keywords: JobKeyWord[];
  locations: string[];
  categoryIds: string[];
  createdAt: string;
  updatedAt: string;
  company: IApiGetCompanyResponse;
}
