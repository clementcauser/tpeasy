import { z } from "zod";

export const createCompanyFromSIRENSchema = z
  .object({
    SIREN: z
      .string()
      .regex(/^\d{9}$/, "SIREN invalide")
      .length(9, "Doit comporter 9 chiffres"),
  })
  .required();

export const createCompanySchema = z.object({
  userId: z.string().cuid(),
  commercialName: z.string(),
  companyPrefix: z.string().optional().or(z.string().min(3)),
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
  userId: z.string().cuid(),
  companyId: z.string().cuid(),
});

export const updateCompanyGeneralInfosSchema = z.object({
  companyId: z.string().cuid(),
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
  companyId: z.string().cuid(),
  currency: z.string(),
  capital: z.string(),
  legalForm: z.string(),
  taxId: z.string(),
  category: z.string().nullable(),
  activityCode: z.string(),
});
