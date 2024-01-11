import axios from "axios";
import { IApiGetCompanyResponse } from "../types/company";
import { ApiResponseError } from "../types/ApiResponse";

export type ApiResponseSuccessGetEmployers = {
  status: number;
  data: IApiGetCompanyResponse[];
  total: number;
};

export type ApiResponseSuccessGetEmployer = {
  status: number;
  data: IApiGetCompanyResponse;
};

export const fetchEmployers = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<ApiResponseError | ApiResponseSuccessGetEmployers> => {
  try {
    const data = await axios.get<IApiGetCompanyResponse[]>(
      `${process.env.REACT_APP_API_BASE_URL}/user/list-employer-information`,
      {
        params: { page, pageSize },
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

export const fetchEmployer = async (query: {
  userId?: string;
  companyId?: string;
}): Promise<ApiResponseError | ApiResponseSuccessGetEmployer> => {
  try {
    const data = await axios.get<IApiGetCompanyResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/user/employer-information`,
      { params: query }
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

export const employerFetchTheirInformation = async (): Promise<
  ApiResponseError | ApiResponseSuccessGetEmployer
> => {
  try {
    const data = await axios.get<IApiGetCompanyResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/employer-info`,
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

export type UpdateEmployeeInfo = {
  companyName?: string;
  companyFullName?: string;
  address: string;
  email: string;
  description?: string;
  logo?: string;
  location?: string;
  detailAddress: string;
  companyImages: string[];
};

export const employerUpdateTheirInformation = async (
  updateData: UpdateEmployeeInfo
): Promise<ApiResponseError | ApiResponseSuccessGetEmployer> => {
  try {
    const data = await axios.put<IApiGetCompanyResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/employer-info`,
      updateData,
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
