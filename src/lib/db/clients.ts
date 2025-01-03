import { z } from "zod";
import {
  createClientSchema,
  deleteClientSchema,
  getCompanyClientsCountSchema,
  getCompanyClientsSchema,
  updateClientSchema,
} from "../validation/clients";
import { prisma } from "./prisma";

type CreateClientPayload = z.infer<typeof createClientSchema>;

export const createClient = async (payload: CreateClientPayload) => {
  return prisma.client.create({
    data: payload,
  });
};

type UpdateClientPayload = z.infer<typeof updateClientSchema>;

export const updateClient = async (payload: UpdateClientPayload) => {
  const { id, ...rest } = payload;
  return prisma.client.update({ where: { id: id }, data: rest });
};

type GetCompanyClientsPayload = z.infer<typeof getCompanyClientsSchema>;

export const getCompanyClients = async (payload: GetCompanyClientsPayload) => {
  return prisma.client.findMany({ where: { companyId: payload.companyId } });
};

type DeleteClientPayload = z.infer<typeof deleteClientSchema>;

export const deleteClient = async (payload: DeleteClientPayload) => {
  return prisma.client.delete({
    where: { companyId: payload.companyId, id: payload.clientId },
  });
};

type GetCompanyClientsCount = z.infer<typeof getCompanyClientsCountSchema>;

export const getCompanyClientsCount = async (
  payload: GetCompanyClientsCount
) => {
  return prisma.client.count({ where: { companyId: payload.companyId } });
};
