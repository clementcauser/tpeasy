import { z } from "zod";
import {
  createCompanySchema,
  getCurrentCompanySchema,
} from "../validation/companies";
import { prisma } from "./prisma";

type CreateCompanyPayload = z.infer<typeof createCompanySchema>;

export async function createCompany({
  userId,
  ...payload
}: CreateCompanyPayload) {
  return prisma.company.create({
    data: { ...payload, users: { connect: { id: userId } } },
  });
}

type GetCurrentCompanyPayload = z.infer<typeof getCurrentCompanySchema>;

export async function getCurrentCompany(payload: GetCurrentCompanyPayload) {
  return prisma.company.findUnique({
    where: {
      id: payload.companyId,
      AND: { users: { some: { id: payload.userId } } },
    },
    include: { companyFeatures: true },
  });
}
