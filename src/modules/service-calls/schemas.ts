import { z } from "zod";

export const createServiceCallSchema =
  z.object({
    companyId: z.string().uuid(),

    siteId: z.string().uuid(),

    assetId: z
      .string()
      .uuid()
      .optional(),

    customerReferenceNumber:
      z.string().optional(),

    callType: z.string().optional(),

    source: z.string().optional(),

    subject: z.string().min(1),

    description:
      z.string().optional(),

    priority: z.string().optional(),

    reportedBy:
      z.string().optional(),

    reportedMobile:
      z.string().optional(),
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