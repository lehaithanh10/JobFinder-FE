import axios from "axios";
import { EIdentifyType, EJobFinderRole } from "../enum-types";
import { IApiLoginResponse, IApiRegisterResponse } from "../types/auth";
import { ApiResponseError } from "../types/ApiResponse";

export type ApiResponseSuccessSignUp = {
  status: number;
  data: IApiRegisterResponse;
};

export const signUp = async ({
  username,
  password,
  passwordAgain,
  role,
  identifierType,
}: {
  username: string;
  password: string;
  passwordAgain: string;
  role: EJobFinderRole;
  identifierType: EIdentifyType;
}): Promise<ApiResponseError | ApiResponseSuccessSignUp> => {
  try {
    const data = await axios.post<IApiRegisterResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
      {
        email: username,
        password,
        passwordAgain,
        role,
        identifierType,
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

export type ApiResponseSuccessSignIn = {
  status: number;
  data: IApiLoginResponse;
};

export const logIn = async ({
  username,
  password,
  role,
  identifierType,
}: {
  username: string;
  password: string;
  role: EJobFinderRole;
  identifierType: EIdentifyType;
}): Promise<ApiResponseError | ApiResponseSuccessSignIn> => {
  try {
    console.log({
      email: username,
      password,
      role,
      identifierType,
    });
    const data = await axios.post<IApiLoginResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      {
        email: username,
        password,
        role,
        identifierType,
      }
    );

    return {
      status: data.status,
      data: data.data,
    };
  } catch (err: any) {
    console.log("err here", err);

    return {
      status: err.response.status,
      ...(err.response && err.response.data && err.response.data.message
        ? {
            message: Array.isArray(err.response.data.message)
              ? [...err.response.data.message]
              : [err.response.data.message],
          }
        : {
            message: Array.isArray(err.message)
              ? [...err.message]
              : [err.message],
          }),
    };
  }
};
