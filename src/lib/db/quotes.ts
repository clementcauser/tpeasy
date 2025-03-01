"use server";

import { z } from "zod";
import {
  addQuoteRowSchema,
  changeQuoteClientSchema,
  changeQuoteStatusSchema,
  createQuoteSchema,
  deleteQuoteSchema,
  getAllCompanyQuotesSchema,
  getAllRowsFromQuoteSchema,
  getLastQuoteReferenceIdSchema,
  getQuoteByIdSchema,
  removeRowFromQuoteSchema,
  updateQuoteSchema,
} from "../validation/quotes";
import { prisma } from "./prisma";
import { QuoteStatus } from "@prisma/client";

type CreateQuotePayload = z.infer<typeof createQuoteSchema>;

export async function createQuote(payload: CreateQuotePayload) {
  return prisma.quote.create({ data: payload });
}

type GetAllCompanyQuotes = z.infer<typeof getAllCompanyQuotesSchema>;

export async function getAllCompanyQuotes(payload: GetAllCompanyQuotes) {
  return prisma.quote.findMany({
    where: { companyId: payload.companyId },
    include: { client: true },
    orderBy: { expirationDate: "asc" },
  });
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
    where: {
      id: payload.id.toString(),
      companyId: payload.companyId.toString(),
    },
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
      console.error("Error: ", error.stack);
    }
  }
}

type ChangeQuoteClientPayload = z.infer<typeof changeQuoteClientSchema>;

export async function changeQuoteClient(payload: ChangeQuoteClientPayload) {
  return prisma.quote.update({
    where: { id: payload.quoteId },
    data: { clientId: payload.clientId },
  });
}

type UpdateQuotePayload = z.infer<typeof updateQuoteSchema>;

export async function updateQuote(payload: UpdateQuotePayload) {
  const rows = await Promise.all(
    payload.rows.map((row) => {
      if (row?.id) {
        const { id, ...rest } = row;
        return prisma.quoteRow.update({
          where: { id: id },
          data: rest,
        });
      } else {
        return prisma.quoteRow.create({
          data: row,
        });
      }
    })
  );

  return prisma.quote.update({
    where: { id: payload.id },
    include: { rows: true },
    data: {
      title: payload.title,
      expirationDate: payload.expirationDate,
      comment: payload.comment,
      clientId: payload.clientId,
      totalET: payload.totalET,
      totalIT: payload.totalIT,
      rows: { connect: rows.map(({ id }) => ({ id })) },
    },
  });
}

type DeleteQuotePayload = z.infer<typeof deleteQuoteSchema>;

export const deleteQuote = async (payload: DeleteQuotePayload) => {
  const quote = await prisma.quote.findUnique({
    where: { id: payload.id },
  });

  if (quote) {
    if (quote.status !== QuoteStatus.DRAFT) {
      return prisma.quote.delete({ where: { id: payload.id } });
    } else {
      throw Error("Quote status is not draft. Unable to delete.");
    }
  } else {
    throw Error("Quote not found");
  }
};

type ChangeQuoteStatusPayload = z.infer<typeof changeQuoteStatusSchema>;

export async function changeQuoteStatus(payload: ChangeQuoteStatusPayload) {
  return prisma.quote.update({
    where: { id: payload.id },
    data: { status: payload.status },
  });
}

type GetAllRowsFromQuotePayload = z.infer<typeof getAllRowsFromQuoteSchema>;

export async function getAllRowsFromQuote(payload: GetAllRowsFromQuotePayload) {
  return prisma.quoteRow.findMany({ where: { quoteId: payload.quoteId } });
}
