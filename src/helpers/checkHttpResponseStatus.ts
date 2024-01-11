import { ApiResponseError, HTTPErrorStatus } from "../types/ApiResponse";

export const isErrorHttpResponse = (
  response: any
): response is ApiResponseError => {
  return (
    (!response.status || HTTPErrorStatus.includes(response.status)) &&
    "message" in response
  );
};
