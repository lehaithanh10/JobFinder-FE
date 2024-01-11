import { EducationDto, SkillDto, WorkingExperienceDto } from "../api/employee";
import { IResumeInfo } from "./resume";

export interface IEmployeeInfo {
  userId: string;
  name: string;
  email: string;
  id?: string;
  resumes: IResumeInfo[];
  dateOfBirth?: string;
  gender?: string;
  profession?: string;
  location?: string;
  mobilePhone?: string;
  profileDescription?: string;
  facebookLink?: string;
  linkedInLink?: string;
  gitHubLink?: string;
  education?: EducationDto[];
  workingExperience?: WorkingExperienceDto[];
  skill?: SkillDto[];
}

export interface IApiGetEmployeeResponse {
  userId: string;
  name: string;
  email: string;
  id?: string;
  resumes: IResumeInfo[];
  gender?: string;
  profession?: string;
  dateOfBirth?: string;
  location?: string;
  mobilePhone?: string;
  profileDescription?: string;
  facebookLink?: string;
  linkedInLink?: string;
  gitHubLink?: string;
  education?: EducationDto[];
  workingExperience?: WorkingExperienceDto[];
  skill?: SkillDto[];
}
