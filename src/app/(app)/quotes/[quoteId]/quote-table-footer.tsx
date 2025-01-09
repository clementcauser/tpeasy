"use client";

import { QuoteFormValues } from "@/components/providers/quote-context";
import { FormField } from "@/components/ui/form";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { getMoneyPrice } from "@/lib/utils/index";
import { useFormContext } from "react-hook-form";

export default function QuoteTableFooter() {
  const { control } = useFormContext<QuoteFormValues>();

  return (
    <TableFooter>
      <TableRow className="">
        <TableCell colSpan={4} className="bg-white" />
        <TableCell colSpan={2} className="border-b text-lg">
          Total HT
        </TableCell>
        <TableCell colSpan={2} className="text-right font-bold border-b">
          <FormField
            control={control}
            name="totalET"
            render={({ field }) => (
              <p className="text-right font-bold text-lg">
                {getMoneyPrice(field.value)}
              </p>
            )}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} className="bg-white" />
        <TableCell colSpan={2} className="text-lg">
          Total TTC
        </TableCell>
        <TableCell colSpan={2} className="text-right font-bold">
          <FormField
            control={control}
            name="totalIT"
            render={({ field }) => (
              <p className="text-right font-bold text-lg">
                {getMoneyPrice(field.value)}
              </p>
            )}
          />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
