import { z } from "zod";

export const createAssetSchema = z.object({
  companyId: z.string().uuid(),
  siteId: z.string().uuid(),
  manufacturerId: z.string().uuid(),

  assetCode: z.string().min(1),
  assetName: z.string().min(1),

  equipmentType: z.string().optional(),

  model: z.string().optional(),
  serialNumber: z.string().optional(),

  purchaseDate: z.string().optional(),

  installationDate: z.string().optional(),

  warrantyStartDate: z.string().optional(),
  warrantyExpiryDate: z.string().optional(),

  location: z.string().optional(),

  status: z.string().optional(),

  remarks: z.string().optional(),
});

export const updateAssetSchema =
  createAssetSchema.partial();