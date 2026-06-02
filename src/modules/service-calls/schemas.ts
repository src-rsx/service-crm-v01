import { z } from "zod";

export const createServiceCallSchema =
  z.object({
    companyId: z.preprocess(
      (v) => v === "" ? undefined : v,
      z.string().uuid().optional()
    ),

    companyName:
      z.string().min(1),

    assetSerialNumber:
      z.string().optional(),

    siteId: z.preprocess(
      (v) => v === "" ? undefined : v,
      z.string().uuid().optional()
    ),

    assetId: z.preprocess(
      (v) => v === "" ? undefined : v,
      z.string().uuid().optional()
    ),

    assignedEngineerId: z.preprocess(
      (v) => v === "" ? undefined : v,
      z.string().uuid().optional()
    ),

    customerReferenceNumber:
      z.string().optional(),

    callType: z.string().optional(),

    source: z.string().optional(),

    subject: z.string().min(1),

    description:
      z.string().optional(),

    // priority: z.string().optional(),
    priority: z.enum([
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ]),

    reportedBy:
      z.string().optional(),

    reportedMobile:
      z.string().optional(),

    customerName:
      z.string().min(1),

    customerMobile:
      z.string().min(5),

    customerEmail:
      z.string()
        .email()
        .optional()
        .or(z.literal("")),

    customerAddress:
      z.string()
        .optional(),
  });

export const updateServiceCallSchema =
  createServiceCallSchema
    .partial()
    .extend({
      status:
        z.string().optional(),

      assignedEngineerId:
        z.string().uuid().optional(),

      resolutionRemarks:
        z.string().optional(),
    });

export const assignEngineerSchema =
  z.object({
    engineerId: z.string().uuid(),
  });

export const updateStatusSchema =
  z.object({
    status: z.enum([
      "LOGGED",
      "ASSIGNED",
      "IN PROGRESS",
      "RESOLVED",
      "CLOSED",
    ]),
  });