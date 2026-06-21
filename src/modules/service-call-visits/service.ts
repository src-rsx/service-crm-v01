import { db } from "@/db";
import { serviceCallEvents } from "@/db/schema";
import { serviceCallVisitsRepository } from "./repository";
import { serviceCallsRepository } from "@/modules/service-calls/repository";

export const serviceCallVisitsService = {
  async createVisit(
    tenantId: string,
    serviceCallId: string,
    engineerId: string
  ) {
    const visit = await serviceCallVisitsRepository.create({
      tenantId,
      serviceCallId,
      engineerId,
      status: "ASSIGNED",
    });

    await db.insert(serviceCallEvents).values({
      serviceCallId,
      eventType: "ENGINEER_ASSIGNED",
      oldStatus: "LOGGED",
      newStatus: "ASSIGNED",
      remarks: null,
      performedByUserId: null,
    });

    return visit;
  },

  async startTravel(visitId: string) {
    const visit = await serviceCallVisitsRepository.update(visitId, {
      status: "TRAVELLING",
      travelStartedAt: new Date(),
    });

    await serviceCallsRepository.updateStatus(
      visit.tenantId,
      visit.serviceCallId,
      "IN_PROGRESS"
    );

    await db.insert(serviceCallEvents).values({
      serviceCallId: visit.serviceCallId,
      eventType: "TRAVEL_STARTED",
      oldStatus: "ASSIGNED",
      newStatus: "IN_PROGRESS",
      remarks: "Engineer started travelling to site",
      performedByUserId: null,
    });

    return visit;
  },

  async checkIn(visitId: string) {
    const visit = await serviceCallVisitsRepository.update(visitId, {
      status: "IN_PROGRESS",
      checkInAt: new Date(),
    });

    await serviceCallsRepository.updateStatus(
      visit.tenantId,
      visit.serviceCallId,
      "IN_PROGRESS"
    );

    await db.insert(serviceCallEvents).values({
      serviceCallId: visit.serviceCallId,
      eventType: "CHECKED_IN",
      oldStatus: "IN_PROGRESS",
      newStatus: "IN_PROGRESS",
      remarks: "Engineer checked in at site",
      performedByUserId: null,
    });

    return visit;
  },

async checkOut(visitId: string) {
  const visit = await serviceCallVisitsRepository.update(visitId, {
    status: "CHECKED_OUT",
    checkOutAt: new Date(),
  });

  // Do NOT change call status here
  // Coordinator decides outcome from detail screen

  await db.insert(serviceCallEvents).values({
    serviceCallId: visit.serviceCallId,
    eventType: "CHECKED_OUT",
    oldStatus: "IN_PROGRESS",
    newStatus: "IN_PROGRESS",
    remarks: "Engineer checked out from site. Awaiting coordinator review.",
    performedByUserId: null,
  });

  return visit;
},

  async getLatestVisit(
    tenantId: string,
    serviceCallId: string
  ) {
    return serviceCallVisitsRepository.findLatestByCall(tenantId, serviceCallId);
  },

  async saveWorkNotes(
    visitId: string,
    observation: string,
    actionTaken: string
  ) {
    return serviceCallVisitsRepository.update(visitId, {
      observation,
      actionTaken,
    });
  },

  async saveCustomerRemarks(
    visitId: string,
    customerName: string,
    customerMobile: string,
    customerRemarks: string
  ) {
    return serviceCallVisitsRepository.update(visitId, {
      customerName,
      customerMobile,
      customerRemarks,
    });
  },

  async getVisitByServiceCall(
    tenantId: string,
    serviceCallId: string
  ) {
    return serviceCallVisitsRepository.findByServiceCall(tenantId, serviceCallId);
  },

  async saveNotes(
    visitId: string,
    data: {
      observation?: string;
      actionTaken?: string;
      rootCause?: string;
      partsUsed?: string;
      customerRemarks?: string;
    }
  ) {
    return serviceCallVisitsRepository.update(visitId, data);
  },

  async getVisitHistory(
    tenantId: string,
    serviceCallId: string
  ) {
    return serviceCallVisitsRepository.findByServiceCallHistory(tenantId, serviceCallId);
  },
};