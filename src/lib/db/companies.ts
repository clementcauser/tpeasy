import { z } from "zod";
import { createCompanySchema } from "../validation/companies";
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
