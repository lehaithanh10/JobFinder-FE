import axios from "axios";
import { EResumeMethod, IResumeInfo } from "../types/resume";
import { EducationDto, SkillDto, WorkingExperienceDto } from "./employee";

export type CreateResumeDto = {
  title: string;
  employeeId: string;
  link: string;
  method: EResumeMethod;
  email?: string;
  name?: string;
  gender?: string;
  dateOfBirth?: Date;
  location?: string;
  mobilePhone?: string;
  facebookLink?: string;
  linkedInLink?: string;
  gitHubLink?: string;
  profession?: string;
  profileDescription?: string;
  skillDescription?: string;
  workingExperience?: WorkingExperienceDto[];
  skill?: SkillDto[];
  education?: EducationDto[];
};

export const uploadResume = async (uploadResumeDto: CreateResumeDto) => {
  try {
    const data = await axios.post<CreateResumeDto>(
      `${process.env.REACT_APP_API_BASE_URL}/resume`,
      uploadResumeDto,
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

export const employeeGetResume = async () => {
  try {
    const data = await axios.get<IResumeInfo[]>(
      `${process.env.REACT_APP_API_BASE_URL}/resume`,
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

export const employeeDeleteResume = async (resumeId: string) => {
  try {
    const data = await axios.delete<IResumeInfo[]>(
      `${process.env.REACT_APP_API_BASE_URL}/resume/${resumeId}`,
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
