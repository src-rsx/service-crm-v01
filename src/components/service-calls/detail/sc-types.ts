export type ServiceCallStatus =
  | "LOGGED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "PARTS_REQUIRED"
  | "RESOLVED"
  | "COMPLETED"
  | "CLOSED";

export type ServiceCallPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export type ServiceCallType =
  | "BREAKDOWN"
  | "PM"
  | "INSTALLATION"
  | "WARRANTY"
  | "AMC";

export interface Engineer {
  id: string;
  name: string;
  mobile: string | null;
  employeeCode: string | null;
  designation: string | null;
}

export interface Company {
  id: string;
  companyName: string;
  customerCode: string;
  contactPerson: string | null;
  mobile: string | null;
  city: string | null;
}

export interface Site {
  id: string;
  siteName: string;
  siteCode: string | null;
  contactPerson: string | null;
  mobile: string | null;
  address: string | null;
  city: string | null;
}

export interface Asset {
  id: string;
  assetName: string;
  assetCode: string;
  model: string | null;
  serialNumber: string | null;
  installationDate: string | null;
  warrantyExpiryDate: string | null;
  equipmentType: string | null;
}

export interface ServiceCallEvent {
  id: string;
  serviceCallId: string;
  eventType: string;
  remarks: string | null;
  oldStatus: string | null;
  newStatus: string | null;
  performedByUserId: string | null;
  createdAt: string;
}

export interface ServiceCall {
  id: string;
  callNumber: string;
  subject: string;
  description: string | null;
  status: ServiceCallStatus;
  priority: ServiceCallPriority;
  callType: ServiceCallType;
  source: string;

  // customer info on call
  customerName: string | null;
  customerMobile: string | null;
  customerEmail: string | null;
  customerAddress: string | null;
  customerReferenceNumber: string | null;

  // reporter
  reportedBy: string | null;
  reportedMobile: string | null;

  // resolution
  resolutionRemarks: string | null;

  // FKs
  companyId: string | null;
  siteId: string | null;
  assetId: string | null;
  assignedEngineerId: string | null;

  // timestamps
  openedAt: string;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;

  // relations (when loaded with joins)
  company?: Company;
  site?: Site;
  asset?: Asset;
  assignedEngineer?: Engineer;
  events?: ServiceCallEvent[];
}

// State machine — valid transitions
type TransitionMap = Record<ServiceCallStatus, ServiceCallStatus[]>;
export const VALID_TRANSITIONS: TransitionMap = {
  LOGGED: ["ASSIGNED"],
  ASSIGNED: ["LOGGED", "IN_PROGRESS"],
  IN_PROGRESS: ["PARTS_REQUIRED", "RESOLVED"],
  PARTS_REQUIRED: ["IN_PROGRESS"],
  RESOLVED: ["CLOSED"],
  COMPLETED: ["CLOSED"],
  CLOSED: [],
};

// Status display config
type StatusConfigMap = Record<ServiceCallStatus, { label: string; color: string; bg: string }>;
export const STATUS_CONFIG: StatusConfigMap = {
  LOGGED: {
    label: "Logged",
    color: "text-slate-700",
    bg: "bg-slate-100",
  },
  ASSIGNED: {
    label: "Assigned",
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "text-yellow-700",
    bg: "bg-yellow-100",
  },
  PARTS_REQUIRED: {
    label: "Parts Required",
    color: "text-orange-700",
    bg: "bg-orange-100",
  },
  COMPLETED: {
    label: "Completed",
    color: "text-green-700",
    bg: "bg-green-100",
  },
    RESOLVED: {
    label: "Resolved",
    color: "text-green-700",
    bg: "bg-green-100",
  },
  CLOSED: {
    label: "Closed",
    color: "text-zinc-500",
    bg: "bg-zinc-100",
  },
};

type PriorityConfigMap = Record<ServiceCallPriority, { label: string; color: string; bg: string }>;
export const PRIORITY_CONFIG: PriorityConfigMap = {
  LOW: {
    label: "Low",
    color: "text-zinc-600",
    bg: "bg-zinc-100",
  },
  MEDIUM: {
    label: "Medium",
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
  HIGH: {
    label: "High",
    color: "text-orange-700",
    bg: "bg-orange-100",
  },
  CRITICAL: {
    label: "Critical",
    color: "text-red-700",
    bg: "bg-red-100",
  },
};

export interface ServiceCallVisit {
  id: string;
  status: string;
  observation: string | null;
  actionTaken: string | null;
  customerName: string | null;
  customerMobile: string | null;
  customerRemarks: string | null;
  travelStartedAt: string | null;
  checkInAt: string | null;
  checkOutAt: string | null;
}