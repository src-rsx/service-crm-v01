import { z } from "zod";

export const companyFormSchema =
  z.object({
    customerCode:
      z.string().min(1),

    companyName:
      z.string().min(1),

    contactPerson:
      z.string().optional(),

    mobile:
      z.string().optional(),

    email:
      z.string().optional(),

    city:
      z.string().optional(),

    state:
      z.string().optional(),

    remarks:
      z.string().optional(),
  });

export type CompanyFormValues =
  z.infer<
    typeof companyFormSchema
  >;