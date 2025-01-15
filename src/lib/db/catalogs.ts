"use server";

import { z } from "zod";
import { getCatalogItemsByTypeSchema } from "../validation/catalogs";
import { prisma } from "./prisma";

type GetCatalogItemsByTypePayload = z.infer<typeof getCatalogItemsByTypeSchema>;

export async function getCatalogItemsByType({
  companyId,
  type,
}: GetCatalogItemsByTypePayload) {
  return prisma.catalogRow.findMany({
    where: { companyId, type },
  });
}
