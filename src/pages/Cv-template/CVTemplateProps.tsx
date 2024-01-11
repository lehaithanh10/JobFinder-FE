import {
  EducationDto,
  SkillDto,
  WorkingExperienceDto,
} from "../../api/employee";

export type CVTemplateProps = {
  name?: string;
  gender?: string;
  profession?: string;
  location?: string;
  mobilePhone?: string;
  email?: string;
  profileDescription?: string;
  facebookLink?: string;
  linkedInLink?: string;
  gitHubLink?: string;
  education?: EducationDto[];
  skill?: SkillDto[];
  workingExperience?: WorkingExperienceDto[];
  skillDescription?: string;
  handleBackToEditButton: () => void;
  handleSaveCVButton: () => void;
};
