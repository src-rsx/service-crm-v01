export const SERVICE_CALL_STATUSES = [
  "LOGGED",
  "ASSIGNED",
  "IN PROGRESS",
  "RESOLVED",
  "CLOSED",
] as const;

export const SERVICE_CALL_PRIORITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
] as const;

export type ServiceCallStatus =
  (typeof SERVICE_CALL_STATUSES)[number];