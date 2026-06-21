export interface TimelineEvent {
  id: string;
  eventType: string;
  createdAt: Date;
  oldStatus?: string;
  newStatus?: string;
  remarks?: string;
  actorName?: string;
}

export function visitsToTimelineEvents(visits: any[]): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  for (const visit of visits) {
    // 1. Visit created (engineer assigned)
    events.push({
      id: `${visit.id}_created`,
      eventType: "ENGINEER_ASSIGNED",
      createdAt: new Date(visit.createdAt),
      actorName: visit.engineer?.name,
    });

    // 2. Travel started
    if (visit.travelStartedAt) {
      events.push({
        id: `${visit.id}_travel`,
        eventType: "TRAVEL_STARTED",
        createdAt: new Date(visit.travelStartedAt),
        actorName: visit.engineer?.name,
      });
    }

    // 3. Check-in
    if (visit.checkInAt) {
      events.push({
        id: `${visit.id}_checkin`,
        eventType: "CHECK_IN",
        createdAt: new Date(visit.checkInAt),
        actorName: visit.engineer?.name,
      });
    }

    // 4. Check-out (resolution)
    if (visit.checkOutAt) {
      events.push({
        id: `${visit.id}_checkout`,
        eventType: "COMPLETED",
        createdAt: new Date(visit.checkOutAt),
        actorName: visit.engineer?.name,
        remarks: visit.observation || visit.actionTaken,
      });
    }

    // 5. Reassignment (if any)
    if (visit.reassignedAt) {
      events.push({
        id: `${visit.id}_reassigned`,
        eventType: "REASSIGNED",
        createdAt: new Date(visit.reassignedAt),
        remarks: visit.reassignmentRemarks,
      });
    }
  }

  // Sort by createdAt descending (newest first)
  return events.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}