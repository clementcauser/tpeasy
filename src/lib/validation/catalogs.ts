import { QuoteRowType } from "@prisma/client";
import { z } from "zod";

export const getCatalogItemsByTypeSchema = z.object({
  companyId: z.string().cuid(),
  type: z.nativeEnum(QuoteRowType),
});
