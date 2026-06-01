export const SERVICE_CALL_STATUSES = [
  "OPEN",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
] as const;

export type ServiceCallStatus =
  (typeof SERVICE_CALL_STATUSES)[number];