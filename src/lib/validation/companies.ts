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
  siren: z.string(),
  siret: z.string(),
  category: z.string().nullable(),
  activityCode: z.string(),
  address: z.string(),
  currency: z.string(),
  capital: z.string(),
  mainPhone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro de téléphone invalide")
    .length(10, "Doit comporter 10 chiffres"),
  secondaryPhone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro de téléphone invalide")
    .length(10, "Doit comporter 10 chiffres")
    .nullable(),
});

export const getCurrentCompanySchema = z.object({
  userId: z.string().cuid(),
  companyId: z.string().cuid(),
});
