"use server";

import { z } from "zod";
import { prisma } from "./prisma";
import {
  addQuoteRowSchema,
  createQuoteRowSchema,
  createQuoteSchema,
  getAllCompanyQuotesSchema,
  getAllQuoteRowsByCompanySchema,
  getLastQuoteReferenceIdSchema,
  getQuoteByIdSchema,
  removeRowFromQuoteSchema,
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

type GetAllCompanyQuotes = z.infer<typeof getAllCompanyQuotesSchema>;

export async function getAllCompanyQuotes(payload: GetAllCompanyQuotes) {
  return prisma.quote.findMany({ where: { companyId: payload.companyId } });
}

type GetLastQuoteReferenceId = z.infer<typeof getLastQuoteReferenceIdSchema>;

export async function getLastQuoteReferenceId(
  payload: GetLastQuoteReferenceId
) {
  return prisma.quote.findFirst({
    where: { companyId: payload.companyId },
    select: { referenceId: true },
    orderBy: { referenceId: "desc" },
  });
}

type GetQuoteByIdPayload = z.infer<typeof getQuoteByIdSchema>;

export async function getQuoteById(payload: GetQuoteByIdPayload) {
  return prisma.quote.findFirstOrThrow({
    where: { id: payload.id, companyId: payload.companyId },
    include: {
      client: true,
      rows: { orderBy: { order: "asc" } },
    },
  });
}

type AddQuoteRowPayload = z.infer<typeof addQuoteRowSchema>;

export async function addQuoteRow(payload: AddQuoteRowPayload) {
  return prisma.quoteRow.create({ data: { ...payload } });
}

type RemoveRowFromQuotePayload = z.infer<typeof removeRowFromQuoteSchema>;

export async function removeRowFromQuote(payload: RemoveRowFromQuotePayload) {
  try {
    return prisma.quote.update({
      where: { id: payload.quoteId },
      data: { rows: { disconnect: { id: payload.rowId } } },
      include: { rows: true },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
}
