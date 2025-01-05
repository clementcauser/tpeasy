import { getAllCompanyQuotes } from "../db/quotes";
import { actionClient } from "../utils/actions";
import { getAllCompanyQuotesSchema } from "../validation/quotes";

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
