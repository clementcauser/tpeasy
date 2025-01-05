import { z } from "zod";
import {
  createCompanySchema,
  getCurrentCompanySchema,
  updateCompanyGeneralInfosSchema,
  updateCompanyLegalInfosSchema,
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
    include: { companyFeatures: { include: { feature: true } } },
  });
}

type UpdateCompanyGeneralInfosPayload = z.infer<
  typeof updateCompanyGeneralInfosSchema
>;

export async function updateCompanyGeneralInfos(
  payload: UpdateCompanyGeneralInfosPayload
) {
  const { companyId, ...rest } = payload;

  return prisma.company.update({
    data: rest,
    where: { id: companyId },
  });
}

type UpdateCompanyLegalInfosPayload = z.infer<
  typeof updateCompanyLegalInfosSchema
>;

export async function updateCompanyLegalInfos(
  payload: UpdateCompanyLegalInfosPayload
) {
  const { companyId, ...rest } = payload;

  return prisma.company.update({
    data: rest,
    where: { id: companyId },
  });
}
