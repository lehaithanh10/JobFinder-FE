import axios from "axios";

export type CreateEmployeeEducationDto = {
  schoolName?: string;
  studyField?: string;
  startingDate?: string;
  endingDate?: string;
  description?: string;
  id?: string;
};

export type UpdateEmployeeEducationDto = {
  schoolName?: string;
  studyField?: string;
  startingDate?: string;
  endingDate?: string;
  description?: string;
};

export const createEmployeeEducation = async (
  createEmployeeEducationDto: CreateEmployeeEducationDto
) => {
  console.log(createEmployeeEducationDto);
  try {
    const data = await axios.post<CreateEmployeeEducationDto>(
      `${process.env.REACT_APP_API_BASE_URL}/employee-education`,
      { educations: [createEmployeeEducationDto] },
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

export const updateEmployeeEducation = async (
  updateEmployeeEducationDto: UpdateEmployeeEducationDto,
  educationId: string
) => {
  try {
    const data = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/employee-education`,
      updateEmployeeEducationDto,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: { educationId },
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

export const deleteEmployeeEducation = async (educationId: string) => {
  try {
    const data = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/employee-education`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: { educationId },
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
