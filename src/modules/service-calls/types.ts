export interface ServiceCallFilters {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateServiceCallInput {
  companyId?: string;
  siteId?: string;
  assetId?: string;

  companyName: string;
  assetSerialNumber?: string;
  assignedEngineerId?: string;

  customerReferenceNumber?: string;

  customerName: string;
  customerMobile: string;

  customerEmail?: string;
  customerAddress?: string;

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