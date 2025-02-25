import { QuoteRowType } from "@prisma/client";
import { z } from "zod";
import { objectIdSchema } from "./common";

export const getCatalogItemsByTypeSchema = z.object({
  companyId: objectIdSchema,
  type: z.nativeEnum(QuoteRowType),
});
