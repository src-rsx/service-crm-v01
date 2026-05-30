export interface ServiceCallFilters {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateServiceCallInput {
  companyId: string;
  siteId: string;

  assetId?: string;

  customerReferenceNumber?: string;

  callType?: string;
  source?: string;

  subject: string;
  description?: string;

  priority?: string;

  reportedBy?: string;
  reportedMobile?: string;
}

export interface UpdateServiceCallInput
  extends Partial<CreateServiceCallInput> {
  status?: string;

  assignedEngineerId?: string;

  resolutionRemarks?: string;
}