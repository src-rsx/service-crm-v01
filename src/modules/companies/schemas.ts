import { z } from "zod";

export const createCompanySchema = z.object({
  customerCode: z.string().min(1),
  companyName: z.string().min(1),

  contactPerson: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().email().optional(),
  gstNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  remarks: z.string().optional(),
});

export type CreateCompanySchema =
  z.infer<typeof createCompanySchema>;