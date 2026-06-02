export interface ServiceCallFormValues {
  customerName: string;
  companyName: string;
  customerMobile: string;

  customerEmail?: string;
  customerAddress?: string;

  companyId?: string;
  siteId?: string;
  assetId?: string;
  assetSerialNumber?: string;

  companySearch?: string;
  customerReferenceNumber?: string;

  callType?: string;
  source?: string;

  subject: string;
  description?: string;

  priority?: string;

  assignedEngineerId?: string;
}