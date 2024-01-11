export interface IApiGetCompanyResponse {
  id: string;
  companyName: string;
  companyFullName?: string;
  address: string;
  email: string;
  description?: string;
  userId: string;
  logo?: string;
  location?: string;
  detailAddress: string;
  companyImages: string[];
}
