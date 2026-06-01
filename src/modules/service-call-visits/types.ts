export interface CreateVisitInput {
  tenantId: string;

  serviceCallId: string;

  engineerId: string;

  status?: string;
}

export interface UpdateVisitInput {
  status?: string;

  observation?: string;

  actionTaken?: string;

  customerName?: string;

  customerMobile?: string;

  customerRemarks?: string;

  travelStartedAt?: Date;

  checkInAt?: Date;

  checkOutAt?: Date;

  travelLatitude?: number;
  travelLongitude?: number;

  checkInLatitude?: number;
  checkInLongitude?: number;

  checkOutLatitude?: number;
  checkOutLongitude?: number;
  
  partsUsed?: string;
  rootCause?: string;

  reassignedAt?: Date;
  reassignmentRemarks?: string;
}