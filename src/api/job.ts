import axios from "axios";
import { ApiResponseError } from "../types/ApiResponse";
import { JobInfo, JobKeyWord } from "../types/job";

export type ApiResponseSuccessGetJobs = {
  status: number;
  data: JobInfo[];
  total: number;
};

export type FetchJobQueryParams = {
  page: number;
  pageSize: number;
  companyId?: string;
  active?: boolean;
};

export const fetchJobs = async (
  params: FetchJobQueryParams
): Promise<ApiResponseError | ApiResponseSuccessGetJobs> => {
  try {
    const data = await axios.get<JobInfo[]>(
      `${process.env.REACT_APP_API_BASE_URL}/user/job-post/search`,
      { params }
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

export type ApiResponseSuccessGetJobDetail = {
  status: number;
  data: JobInfo;
};

export const fetchJobDetail = async (
  jobPostId: string
): Promise<ApiResponseError | ApiResponseSuccessGetJobDetail> => {
  try {
    const data = await axios.get<JobInfo>(
      `${process.env.REACT_APP_API_BASE_URL}/user/job-post/${jobPostId}`
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

export type CreateNewJobBody = {
  title: string;
  salary: number;
  active: boolean;
  companyId: string;
  requirements: string;
  description: string;
  locations: string[];
  keywords: JobKeyWord[];
  categoryIds?: string[];
};

export type ApiResponseSuccessCreateNewJob = {
  status: number;
  data: JobInfo;
};

export const createNewJob = async (
  body: CreateNewJobBody
): Promise<ApiResponseError | ApiResponseSuccessCreateNewJob> => {
  try {
    const data = await axios.post<JobInfo>(
      `${process.env.REACT_APP_API_BASE_URL}/employer/job-post`,
      body,
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

export const deleteJobPost = async (
  jobPostId: string
): Promise<ApiResponseError | ApiResponseSuccessGetJobDetail> => {
  try {
    const data = await axios.delete<JobInfo>(
      `${process.env.REACT_APP_API_BASE_URL}/employer/job-post`,
      {
        params: { jobPostId },
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

export type UpdateJobDto = {
  title?: string;
  salary?: number;
  active?: boolean;
  requirement?: string;
  description?: string;
  locations?: string[];
  keywords?: JobKeyWord[];
};

export const updateJobPost = async (
  jobPostId: string,
  updateJobDto: UpdateJobDto
): Promise<ApiResponseError | ApiResponseSuccessGetJobDetail> => {
  try {
    const data = await axios.put<JobInfo>(
      `${process.env.REACT_APP_API_BASE_URL}/employer/job-post`,
      updateJobDto,
      {
        params: { jobPostId },
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
