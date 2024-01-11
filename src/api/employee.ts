import axios from "axios";
import { IApiGetEmployeeResponse } from "../types/employee";

export interface EducationDto {
  id?: string;
  startingDate?: string;
  endingDate?: string;
  degree?: string;
  studyField?: string;
  schoolName?: string;
  description?: string;
}

export interface SkillDto {
  id?: string;
  title?: string;
}

export interface WorkingExperienceDto {
  id?: string;
  position?: string;
  companyName?: string;
  companyAddress?: string;
  responsibility?: string;
  startingDate?: string;
  endingDate?: string;
}

export class UpdateEmployeeGeneralInformationDto {
  email?: string;
  name?: string;
  gender?: string;
  profession?: string;
  location?: string;
  mobilePhone?: string;
  facebookLink?: string;
  linkedInLink?: string;
  gitHubLink?: string;
}

export const fetchEmployeeInfo = async (userId: string) => {
  try {
    const data = await axios.get<IApiGetEmployeeResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/user/employee-information`,
      { params: { userId } }
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

export const updateEmployeeInfo = async (
  updateEmployeeData: UpdateEmployeeGeneralInformationDto
) => {
  try {
    const data = await axios.patch<IApiGetEmployeeResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/employee-information`,
      updateEmployeeData,
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
