import { z } from "zod";

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
  companyId: z.string().cuid(),
  createdById: z.string().cuid(),
});

export const updateClientSchema = z.object({
  id: z.string().cuid(),
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
  companyId: z.string().cuid(),
  createdById: z.string().cuid(),
});

export const getCompanyClientsSchema = z.object({
  companyId: z.string().cuid(),
});

export const deleteClientSchema = z.object({
  clientId: z.string().cuid(),
  companyId: z.string().cuid(),
});

export const getCompanyClientsCountSchema = z.object({
  companyId: z.string().cuid(),
});
