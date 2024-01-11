import { EApplicationStatus } from "../enum-types";
import { IApiGetEmployeeResponse } from "./employee";

export interface IApplicationInfo {
  id: string;
  employeeId: string;
  jobPostId: string;
  resumeId: string;
  message?: string;
  status: EApplicationStatus;
  createdAt: string;
  updatedAt: string;
  job: {
    title: string;
    id: string;
  };
  resume: {
    link: string;
    title: string;
    name: string;
  };
  employee: IApiGetEmployeeResponse;
}
