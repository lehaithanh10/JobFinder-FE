import axios from "axios";

export type CreateEmployeeWorkingExperienceDto = {
  id?: string;
  position?: string;
  companyName?: string;
  companyAddress?: string;
  responsibility?: string;
  startingDate?: string;
  endingDate?: string;
};

export type UpdateEmployeeWorkingExperienceDto = {
  position?: string;
  companyName?: string;
  companyAddress?: string;
  responsibility?: string;
  startingDate?: string;
  endingDate?: string;
};

export const createEmployeeWorkingExperience = async (
  createEmployeeWorkingExperienceDto: CreateEmployeeWorkingExperienceDto
) => {
  try {
    const data = await axios.post<CreateEmployeeWorkingExperienceDto>(
      `${process.env.REACT_APP_API_BASE_URL}/employee-working-experience`,
      { workingExperiences: [createEmployeeWorkingExperienceDto] },
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

export const updateEmployeeWorkingExperience = async (
  updateEmployeeWorkingExperienceDto: UpdateEmployeeWorkingExperienceDto,
  workingExperienceId: string
) => {
  try {
    const data = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/employee-working-experience`,
      updateEmployeeWorkingExperienceDto,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: { workingExperienceId },
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

export const deleteEmployeeWorkingExperience = async (
  workingExperienceId: string
) => {
  try {
    const data = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/employee-working-experience`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: { workingExperienceId },
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
