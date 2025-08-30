export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  contractorInfo?: ContractorInfo;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface ContractorInfo {
  companyName: string;
  primaryContactName: string;
  phoneNumber: string;
  website: string;
  licenseNumber: string;
  primaryContactPhone: string;
  insurancePolicyNumber: string;
  insuranceCompanyName: string;
  additionalNotes: string;
}