import { z } from "zod";

export const visitActionSchema =
  z.object({
    visitId: z.string().uuid(),
  });