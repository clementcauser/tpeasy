"use server";

import { revalidatePath } from "next/cache";
import { actionClient } from "../utils/actions";
import { getCatalogItemsByTypeSchema } from "../validation/catalogs";
import ROUTES from "../constants/routes";
import { getCatalogItemsByType } from "../db/catalogs";

export const getCatalogItemsByTypeAction = actionClient
  .schema(getCatalogItemsByTypeSchema)
  .action(async ({ parsedInput }) => {
    try {
      const catalogItems = await getCatalogItemsByType(parsedInput);

      revalidatePath(ROUTES.quoteDetails, "page");

      return catalogItems;
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });
