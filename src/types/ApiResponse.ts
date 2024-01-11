export type ApiResponseError = {
  status: number;
  message: string[];
};

export const HTTPErrorStatus = [400, 404, 401, 500, 403];
