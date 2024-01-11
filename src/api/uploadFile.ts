import axios from "axios";

export const uploadFile = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/file/upload`,
      formData,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    console.log("data here", data);

    return {
      status: data.status,
      data: data.data,
    };
  } catch (err: any) {
    console.log(err);
    return !!err.response.data
      ? {
          status: err.response.status || 500,
          message: Array.isArray(err.response.data.message)
            ? [...err.response.data.message]
            : [err.response.data.message],
        }
      : {
          status: 500,
          message: Array.isArray(err.message)
            ? [...err.message]
            : [err.message],
        };
  }
};
