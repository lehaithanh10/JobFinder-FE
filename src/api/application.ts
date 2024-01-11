import axios from "axios";
import { ApiResponseError } from "../types/ApiResponse";
import { IApplicationInfo } from "../types/application";
import { AdvancedFilterApplicationParams } from "../pages/Job/ListApplicants";
import _ from "lodash";
import { EApplicationStatus } from "../enum-types";

export type ApiResponseSuccessGetJobDetail = {
  status: number;
  data: IApplicationInfo[];
  total: number;
};

export const fetchJobPostApplications = async (
  jobPostId: string,
  params?: AdvancedFilterApplicationParams
): Promise<ApiResponseError | ApiResponseSuccessGetJobDetail> => {
  try {
    const data = await axios.get<IApplicationInfo[]>(
      `${process.env.REACT_APP_API_BASE_URL}/employer/application`,
      {
        params: {
          jobPostId,
          ...(params && !_.isEmpty(params.skillTitles)
            ? { skillTitles: params.skillTitles }
            : {}),
          ...(params && !_.isEmpty(params.schoolNames)
            ? {
                schoolNames: params.schoolNames.map((schoolName) =>
                  schoolName ===
                  "Hanoi University of Science & Technology (HUST)"
                    ? "HUST"
                    : schoolName
                ),
              }
            : {}),
          yearsOfWorkingExperience: params?.yearsOfWorkingExp,
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return {
      status: data.status,
      data: data.data,
      total: Number(data.headers["x-pagination-total"]),
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      message: Array.isArray(err.response.data.message)
        ? [...err.response.data.message]
        : [err.response.data.message],
    };
  }
};

export const employeeFetchApplications = async (): Promise<
  ApiResponseError | ApiResponseSuccessGetJobDetail
> => {
  try {
    const data = await axios.get<IApplicationInfo[]>(
      `${process.env.REACT_APP_API_BASE_URL}/employee/application`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return {
      status: data.status,
      data: data.data,
      total: Number(data.headers["x-pagination-total"]),
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      message: Array.isArray(err.response.data.message)
        ? [...err.response.data.message]
        : [err.response.data.message],
    };
  }
};

export type ApiResponseSuccessReplyApplication = {
  status: number;
};

export const replyEmployeeApplication = async (
  applicationId: string,
  status: EApplicationStatus
): Promise<ApiResponseError | ApiResponseSuccessReplyApplication> => {
  try {
    const data = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/employer/application/reply`,
      { applicationId, status },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return {
      status: data.status,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      message: Array.isArray(err.response.data.message)
        ? [...err.response.data.message]
        : [err.response.data.message],
    };
  }
};

export type ApiResponseSuccessCreateApplication = {
  status: number;
  data: IApplicationInfo;
};

export const employeeCreateApplication = async (createApplicationDto: {
  jobPostId: string;
  employeeId: string;
  resumeId: string;
  message: string;
}): Promise<ApiResponseError | ApiResponseSuccessCreateApplication> => {
  try {
    const data = await axios.post<IApplicationInfo>(
      `${process.env.REACT_APP_API_BASE_URL}/employee/application`,
      createApplicationDto,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return {
      status: data.status,
      data: data.data,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      message: Array.isArray(err.response.data.message)
        ? [...err.response.data.message]
        : [err.response.data.message],
    };
  }
};
