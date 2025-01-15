"use server";

import { revalidatePath } from "next/cache";
import ROUTES from "../constants/routes";
import {
  addQuoteRow,
  changeQuoteClient,
  createQuote,
  getAllCompanyQuotes,
  getLastQuoteReferenceId,
  getQuoteById,
  removeRowFromQuote,
  updateQuote,
} from "../db/quotes";
import { actionClient } from "../utils/actions";
import { incrementQuotePrefix } from "../utils/quotes";
import {
  addQuoteRowSchema,
  changeQuoteClientSchema,
  createQuoteSchema,
  getAllCompanyQuotesSchema,
  getQuoteByIdSchema,
  removeRowFromQuoteSchema,
  updateQuoteSchema,
} from "../validation/quotes";

export const getAllCompanyQuotesAction = actionClient
  .schema(getAllCompanyQuotesSchema)
  .action(async ({ parsedInput }) => {
    try {
      const allQuotes = await getAllCompanyQuotes(parsedInput);

      return allQuotes;
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });

export const createQuoteAction = actionClient
  .schema(createQuoteSchema)
  .action(async ({ parsedInput }) => {
    try {
      const lastReference = await getLastQuoteReferenceId({
        companyId: parsedInput.companyId,
      });

      if (lastReference) {
        const newReferenceId = incrementQuotePrefix(lastReference.referenceId);

        return createQuote({
          ...parsedInput,
          referenceId: newReferenceId,
        });
      } else {
        return createQuote(parsedInput);
      }
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });

export const getQuoteByIdAction = actionClient
  .schema(getQuoteByIdSchema)
  .action(async ({ parsedInput }) => {
    try {
      return getQuoteById(parsedInput);
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });

export const addQuoteRowAction = actionClient
  .schema(addQuoteRowSchema)
  .action(async ({ parsedInput }) => {
    try {
      const newRow = await addQuoteRow(parsedInput);

      revalidatePath(ROUTES.quoteDetails, "page");

      return newRow;
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });

export const removeRowFromQuoteAction = actionClient
  .schema(removeRowFromQuoteSchema)
  .action(async ({ parsedInput }) => {
    try {
      const updated = await removeRowFromQuote(parsedInput);

      revalidatePath(ROUTES.quoteDetails, "page");

      return updated;
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });

export const changeQuoteClientAction = actionClient
  .schema(changeQuoteClientSchema)
  .action(async ({ parsedInput }) => {
    try {
      const updated = await changeQuoteClient(parsedInput);

      revalidatePath(ROUTES.quoteDetails, "page");

      return updated;
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });

export const updateQuoteAction = actionClient
  .schema(updateQuoteSchema)
  .action(async ({ parsedInput }) => {
    try {
      const updated = await updateQuote(parsedInput);

      revalidatePath(ROUTES.quoteDetails, "page");

      return updated;
    } catch (error) {
      console.error(error);

      throw Error(error as string);
    }
  });
