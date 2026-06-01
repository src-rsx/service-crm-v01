import {
  serviceCallVisitsRepository,
} from "./repository";

import {
  serviceCallsRepository,
} from "@/modules/service-calls/repository";

export const
  serviceCallVisitsService =
{
  async createVisit(
    tenantId: string,
    serviceCallId: string,
    engineerId: string
  ) {
    return serviceCallVisitsRepository.create(
      {
        tenantId,
        serviceCallId,
        engineerId,
        status:
          "ASSIGNED",
      }
    );
  },

async startTravel(
  visitId: string
) {
  const visit =
    await serviceCallVisitsRepository.update(
      visitId,
      {
        status:
          "TRAVELLING",

        travelStartedAt:
          new Date(),
      }
    );

  await serviceCallsRepository.updateStatus(
    visit.tenantId,
    visit.serviceCallId,
    "IN_PROGRESS"
  );

  return visit;
},

async checkIn(
  visitId: string
) {

  const visit =
    await serviceCallVisitsRepository.update(
      visitId,
      {
        status: "IN_PROGRESS",
        checkInAt: new Date(),
      }
    );

  await serviceCallsRepository.updateStatus(
    visit.tenantId,
    visit.serviceCallId,
    "IN_PROGRESS"
  );

  return visit;
},

async checkOut(
  visitId: string
) {
  const visit =
    await serviceCallVisitsRepository.update(
      visitId,
      {
        status:
          "RESOLVED",

        checkOutAt:
          new Date(),
      }
    );

  await serviceCallsRepository.updateStatus(
    visit.tenantId,
    visit.serviceCallId,
    "RESOLVED"
  );

  return visit;
},

  async getLatestVisit(
    tenantId: string,
    serviceCallId: string
    ) {
    return serviceCallVisitsRepository.findLatestByCall(
        tenantId,
        serviceCallId
    );
    },

    async saveWorkNotes(
  visitId: string,
  observation: string,
  actionTaken: string
) {
  return serviceCallVisitsRepository.update(
    visitId,
    {
      observation,
      actionTaken,
    }
  );
},

async saveCustomerRemarks(
  visitId: string,
  customerName: string,
  customerMobile: string,
  customerRemarks: string
) {
  return serviceCallVisitsRepository.update(
    visitId,
    {
      customerName,
      customerMobile,
      customerRemarks,
    }
  );
},

async getVisitByServiceCall(
  tenantId: string,
  serviceCallId: string
) {
  return serviceCallVisitsRepository.findByServiceCall(
    tenantId,
    serviceCallId
  );
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
  return serviceCallVisitsRepository.update(
    visitId,
    data
  );
},
};