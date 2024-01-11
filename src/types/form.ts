export interface IFormAddPeopleTamTru {
  image: string;
  relationship: string;
  status: string;
  firstName: string;
  lastName: string;
  specialNotes: string;
  departmentTime?: string;
  canCuocCongDan: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  queQuan: string;
  addressThuongTru: string;
  addressTamTru: string;
  address: string;
  owner: string;
  cccdChuHo: string;
  ndDeNghi: string;
  religion: string;
  vanHoa: null;
  job: string;
}

export interface IFormAddPeople {
  image: string;
  relationship: string;
  status: string;
  firstName: string;
  lastName: string;
  specialNotes: string;
  departmentTime?: string;
  canCuocCongDan?: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  owner: string;
  cccdChuHo?: string;
  job: string;
  idSHK: string;
}
