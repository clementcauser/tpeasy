import { z } from "zod";
import { objectIdSchema } from "./common";

export const createClientSchema = z.object({
  name: z.string().min(1, "Champ obligatoire"),
  address: z.string().min(1, "Champ obligatoire"),
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
  email: z.string().email(),
  companyId: objectIdSchema,
  createdById: objectIdSchema,
});

export const updateClientSchema = z.object({
  id: objectIdSchema,
  name: z.string().min(1, "Champ obligatoire"),
  address: z.string().min(1, "Champ obligatoire"),
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
  email: z.string().email(),
  companyId: objectIdSchema,
  createdById: objectIdSchema,
});

export const getCompanyClientsSchema = z.object({
  companyId: objectIdSchema,
});

export const deleteClientSchema = z.object({
  clientId: objectIdSchema,
  companyId: objectIdSchema,
});

export const getCompanyClientsCountSchema = z.object({
  companyId: objectIdSchema,
});
