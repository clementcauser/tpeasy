import { z } from "zod";
import { prisma } from "./prisma";
import {
  createQuoteRowSchema,
  createQuoteSchema,
  getAllQuoteRowsByCompanySchema,
} from "../validation/quotes";

type CreateQuoteRowPayload = z.infer<typeof createQuoteRowSchema>;

export async function createQuoteRow(payload: CreateQuoteRowPayload) {
  return prisma.quoteRow.create({
    data: {
      ...payload,
    },
  });
}

type CreateQuotePayload = z.infer<typeof createQuoteSchema>;

export async function createQuote(payload: CreateQuotePayload) {
  return prisma.quote.create({ data: payload });
}

type GetAllQuoteRowsByCompanyPayload = z.infer<
  typeof getAllQuoteRowsByCompanySchema
>;

export async function getAllQuoteRowsByCompany(
  payload: GetAllQuoteRowsByCompanyPayload
) {
  return prisma.quoteRow.findMany({ where: { companyId: payload.companyId } });
}
