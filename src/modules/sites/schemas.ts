import { z } from "zod";

export const createSiteSchema = z.object({
  companyId: z.string().uuid(),

  siteCode: z.string().min(1),
  siteName: z.string().min(1),

  contactPerson: z.string().optional(),
  mobile: z.string().optional(),
  email: z.email().optional(),

  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),

  latitude: z.string().optional(),
  longitude: z.string().optional(),

  remarks: z.string().optional(),
});

export const updateSiteSchema =
  createSiteSchema.partial();

export type CreateSiteRequest =
  z.infer<typeof createSiteSchema>;

export type UpdateSiteRequest =
  z.infer<typeof updateSiteSchema>;