import { z } from "zod";

export const createEngineerSchema =
  z.object({
    employeeCode:
      z.string().optional(),

    name:
      z.string().min(1),

    mobile:
      z.string().optional(),

    email:
      z.string().email().optional(),

    designation:
      z.string().optional(),
  });

export const updateEngineerSchema =
  createEngineerSchema.partial();