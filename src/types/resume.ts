export interface IResumeInfo {
  title: string;
  link: string;
  id: string;
  method: EResumeMethod;
}

export interface UploadCVDto {
  title: string;
  file: File;
}

export enum EResumeMethod {
  CREATE = "create",
  UPLOAD = "upload",
}
