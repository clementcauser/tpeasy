"use server";

import { revalidatePath } from "next/cache";
import {
  createClient,
  deleteClient,
  getCompanyClients,
  getCompanyClientsCount,
  updateClient,
} from "../db/clients";
import { actionClient } from "../utils/actions";
import {
  createClientSchema,
  deleteClientSchema,
  getCompanyClientsCountSchema,
  getCompanyClientsSchema,
  updateClientSchema,
} from "../validation/clients";
import ROUTES from "../constants/routes";

export const createClientAction = actionClient
  .schema(createClientSchema)
  .action(async ({ parsedInput }) => {
    try {
      const client = await createClient(parsedInput);

      revalidatePath(ROUTES.clients);

      return client;
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });

export const udpateClientAction = actionClient
  .schema(updateClientSchema)
  .action(async ({ parsedInput }) => {
    try {
      const client = await updateClient(parsedInput);

      revalidatePath(ROUTES.clients);

      return client;
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });

export const getCompanyClientsAction = actionClient
  .schema(getCompanyClientsSchema)
  .action(async ({ parsedInput }) => {
    try {
      const clients = await getCompanyClients(parsedInput);

      return clients;
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });

export const deleteClientAction = actionClient
  .schema(deleteClientSchema)
  .action(async ({ parsedInput }) => {
    try {
      const deleted = await deleteClient(parsedInput);

      revalidatePath(ROUTES.clients);

      return deleted;
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });

export const getCompanyClientsCountAction = actionClient
  .schema(getCompanyClientsCountSchema)
  .action(async ({ parsedInput }) => {
    try {
      return getCompanyClientsCount(parsedInput);
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });
