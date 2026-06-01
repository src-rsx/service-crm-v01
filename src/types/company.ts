export interface Company {
  id: string;
  customerCode: string;
  companyName: string;
  contactPerson: string | null;
  mobile: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  isActive: boolean;
  createdAt: string;
}