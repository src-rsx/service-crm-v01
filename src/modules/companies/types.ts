export interface CreateCompanyInput {
  customerCode: string;
  companyName: string;
  contactPerson?: string;
  mobile?: string;
  email?: string;
  gstNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  remarks?: string;
}