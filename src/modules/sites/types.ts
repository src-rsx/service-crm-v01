export interface SiteFilters {
  search?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
}

export interface CreateSiteInput {
  companyId: string;

  siteCode?: string;
  siteName: string;

  contactPerson?: string;
  mobile?: string;
  email?: string;

  address?: string;
  city?: string;
  state?: string;
  pincode?: string;

  latitude?: string;
  longitude?: string;

  remarks?: string;
}

export interface UpdateSiteInput
  extends Partial<CreateSiteInput> {}