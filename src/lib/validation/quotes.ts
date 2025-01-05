import { QuoteRowType, QuoteStatus, TaxRate } from "@prisma/client";
import { z } from "zod";
import { companyPrefixRegex } from "../constants/companies";

export const createQuoteRowSchema = z.object({
  name: z.string().min(1, "Nom obligatoire"),
  quantity: z.number().min(0.01),
  unitPrice: z.number().min(0.01),
  taxRate: z.nativeEnum(TaxRate).default(TaxRate.TAX_20),
  totalET: z.number().min(0.01),
  totalIT: z.number().min(0.01),
  total: z.number().min(0.01),
  type: z.nativeEnum(QuoteRowType).default(QuoteRowType.SERVICE),
  quoteId: z.string().cuid(),
  companyId: z.string().cuid(),
});

export const getAllQuoteRowsByCompanySchema = z.object({
  companyId: z.string().cuid(),
});

export const createQuoteSchema = z.object({
  referenceId: z.string().regex(companyPrefixRegex),
  expirationDate: z.date(),
  comment: z.string().optional(),
  status: z.nativeEnum(QuoteStatus).default(QuoteStatus.PENDING),
  clientId: z.string().cuid(),
  createdById: z.string().cuid(),
  companyId: z.string().cuid(),
});

export const getAllCompanyQuotesSchema = z.object({
  companyId: z.string().cuid(),
});
