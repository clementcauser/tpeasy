import { QuoteRowType, QuoteStatus, TaxRate } from "@prisma/client";
import { z } from "zod";
import { companyPrefixRegex } from "../constants/companies";
import { objectIdSchema } from "./common";

export const createQuoteSchema = z.object({
  referenceId: z.string().regex(companyPrefixRegex),
  expirationDate: z.date(),
  comment: z.string().optional(),
  clientId: objectIdSchema,
  createdById: objectIdSchema,
  companyId: objectIdSchema,
  title: z.string().min(1, "Champ obligatoire"),
});

export const getAllCompanyQuotesSchema = z.object({
  companyId: objectIdSchema,
});

export const getLastQuoteReferenceIdSchema = z.object({
  companyId: objectIdSchema,
});

export const getQuoteByIdSchema = z.object({
  id: objectIdSchema,
  companyId: objectIdSchema,
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
  quoteId: objectIdSchema,
});

export const removeRowFromQuoteSchema = z.object({
  rowId: objectIdSchema,
  quoteId: objectIdSchema,
});

const quoteRowSchema = z.object({
  id: objectIdSchema.optional(),
  name: z.string().min(1, "Champ obligatoire"),
  unit: z.string().min(1, "Champ obligatoire"),
  quantity: z.number().min(0.01),
  unitPrice: z.number().min(0.01),
  taxRate: z.nativeEnum(TaxRate),
  totalET: z.number().min(0.01),
  totalIT: z.number().min(0.01),
  type: z.nativeEnum(QuoteRowType),
  quoteId: objectIdSchema,
  order: z.number().default(0),
});

export const quoteFormSchema = z.object({
  id: objectIdSchema,
  referenceId: z.string().regex(companyPrefixRegex),
  expirationDate: z.date(),
  comment: z.string().nullable(),
  clientId: objectIdSchema,
  createdById: objectIdSchema,
  companyId: objectIdSchema,
  totalET: z.number().min(0.01),
  totalIT: z.number().min(0.01),
  title: z.string().min(1, "Champ obligatoire"),
  rows: z.array(quoteRowSchema),
});

export const changeQuoteClientSchema = z.object({
  quoteId: objectIdSchema,
  clientId: objectIdSchema,
});

export const getAllCompanyQuoteRowsSchema = z.object({
  companyId: objectIdSchema,
  type: z.nativeEnum(QuoteRowType),
});

export const addQuoteRowsFromCatalogSchema = z.object({
  quoteRowIds: z.array(objectIdSchema),
  quoteId: objectIdSchema,
});

export const updateQuoteSchema = z.object({
  id: objectIdSchema,
  referenceId: z.string().regex(companyPrefixRegex),
  expirationDate: z.date(),
  comment: z.string().nullable(),
  clientId: objectIdSchema,
  createdById: objectIdSchema,
  companyId: objectIdSchema,
  totalET: z.number().min(0.01),
  totalIT: z.number().min(0.01),
  title: z.string().min(1, "Champ obligatoire"),
  rows: z.array(quoteRowSchema),
});

export const deleteQuoteSchema = z.object({
  id: objectIdSchema,
});

export const changeQuoteStatusSchema = z.object({
  id: objectIdSchema,
  status: z.nativeEnum(QuoteStatus),
});

export const getAllRowsFromQuoteSchema = z.object({
  quoteId: objectIdSchema,
});
