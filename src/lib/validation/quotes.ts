import { QuoteRowType, QuoteStatus, TaxRate } from "@prisma/client";
import { z } from "zod";
import { companyPrefixRegex } from "../constants/companies";

export const createQuoteSchema = z.object({
  referenceId: z.string().regex(companyPrefixRegex),
  expirationDate: z.date(),
  comment: z.string().optional(),
  clientId: z.string().cuid(),
  createdById: z.string().cuid(),
  companyId: z.string().cuid(),
  title: z.string().min(1, "Champ obligatoire"),
});

export const getAllCompanyQuotesSchema = z.object({
  companyId: z.string().cuid(),
});

export const getLastQuoteReferenceIdSchema = z.object({
  companyId: z.string().cuid(),
});

export const getQuoteByIdSchema = z.object({
  id: z.string().cuid(),
  companyId: z.string().cuid(),
});

export const addQuoteRowSchema = z.object({
  name: z.string().min(1, "Champ obligatoire"),
  unit: z.string().min(1, "Champ obligatoire"),
  quantity: z.number().min(0.01),
  unitPrice: z.number().min(0.01),
  taxRate: z.nativeEnum(TaxRate),
  totalET: z.number().min(0.01),
  totalIT: z.number().min(0.01),
  type: z.nativeEnum(QuoteRowType),
  quoteId: z.string().cuid(),
});

export const removeRowFromQuoteSchema = z.object({
  rowId: z.string().cuid(),
  quoteId: z.string().cuid(),
});

const quoteRowSchema = z.object({
  id: z.string().cuid().or(z.string().cuid2()), // This is a workaround for a bug in zod that doesn't allow both cuid and cuid2
  name: z.string().min(1, "Champ obligatoire"),
  unit: z.string().min(1, "Champ obligatoire"),
  quantity: z.number().min(0.01),
  unitPrice: z.number().min(0.01),
  taxRate: z.nativeEnum(TaxRate),
  totalET: z.number().min(0.01),
  totalIT: z.number().min(0.01),
  type: z.nativeEnum(QuoteRowType),
  quoteId: z.string().cuid(),
  order: z.number().default(0),
});

export const quoteFormSchema = z.object({
  id: z.string().cuid(),
  referenceId: z.string().regex(companyPrefixRegex),
  expirationDate: z.date(),
  comment: z.string().nullable(),
  clientId: z.string().cuid(),
  createdById: z.string().cuid(),
  companyId: z.string().cuid(),
  totalET: z.number().min(0.01),
  totalIT: z.number().min(0.01),
  title: z.string().min(1, "Champ obligatoire"),
  rows: z.array(quoteRowSchema),
});

export const changeQuoteClientSchema = z.object({
  quoteId: z.string().cuid(),
  clientId: z.string().cuid(),
});

export const getAllCompanyQuoteRowsSchema = z.object({
  companyId: z.string().cuid(),
  type: z.nativeEnum(QuoteRowType),
});

export const addQuoteRowsFromCatalogSchema = z.object({
  quoteRowIds: z.array(z.string().cuid()),
  quoteId: z.string().cuid(),
});

export const updateQuoteSchema = z.object({
  id: z.string().cuid(),
  referenceId: z.string().regex(companyPrefixRegex),
  expirationDate: z.date(),
  comment: z.string().nullable(),
  clientId: z.string().cuid(),
  createdById: z.string().cuid(),
  companyId: z.string().cuid(),
  totalET: z.number().min(0.01),
  totalIT: z.number().min(0.01),
  title: z.string().min(1, "Champ obligatoire"),
  rows: z.array(quoteRowSchema),
});

export const deleteQuoteSchema = z.object({
  id: z.string().cuid(),
});

export const changeQuoteStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(QuoteStatus),
});
