import { z } from "zod";
import { objectIdSchema } from "./common";

export const createCompanyFromSIRENSchema = z
  .object({
    SIREN: z
      .string()
      .regex(/^\d{9}$/, "SIREN invalide")
      .length(9, "Doit comporter 9 chiffres"),
  })
  .required();

export const createCompanySchema = z.object({
  userId: objectIdSchema,
  commercialName: z.string(),
  companyPrefix: z.string().optional().or(z.string().min(3)),
  email: z.string().email(),
  siren: z.string(),
  siret: z.string(),
  category: z.string().nullable(),
  activityCode: z.string(),
  address: z.string(),
  currency: z.string(),
  capital: z.string(),
  legalForm: z.string(),
  taxId: z.string(),
  rcs: z.string(),
  mainPhone: z
    .string()
    .min(1, "Champ obligatoire")
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro de téléphone invalide"),
  secondaryPhone: z
    .string()
    .optional()
    .or(
      z
        .string()
        .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro de téléphone invalide")
    ),
});

export const getCurrentCompanySchema = z.object({
  userId: objectIdSchema,
  companyId: objectIdSchema,
});

export const updateCompanyGeneralInfosSchema = z.object({
  companyId: objectIdSchema,
  email: z.string().email(),
  commercialName: z.string(),
  companyPrefix: z.string().optional().or(z.string().min(3)),
  address: z.string(),
  mainPhone: z
    .string()
    .min(1, "Champ obligatoire")
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro de téléphone invalide"),
  secondaryPhone: z
    .string()
    .optional()
    .or(
      z
        .string()
        .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro de téléphone invalide")
    ),
});

export const updateCompanyLegalInfosSchema = z.object({
  companyId: objectIdSchema,
  currency: z.string(),
  capital: z.string(),
  legalForm: z.string(),
  taxId: z.string(),
  category: z.string().nullable(),
  activityCode: z.string(),
});
