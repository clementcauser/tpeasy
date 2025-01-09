"use server";

import {
  addQuoteRow,
  createQuote,
  getAllCompanyQuotes,
  getLastQuoteReferenceId,
  getQuoteById,
  removeRowFromQuote,
} from "../db/quotes";
import { actionClient } from "../utils/actions";
import { incrementQuotePrefix } from "../utils/quotes";
import {
  addQuoteRowSchema,
  createQuoteSchema,
  getAllCompanyQuotesSchema,
  getQuoteByIdSchema,
  removeRowFromQuoteSchema,
} from "../validation/quotes";
import ROUTES from "../constants/routes";
import { revalidatePath } from "next/cache";

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
