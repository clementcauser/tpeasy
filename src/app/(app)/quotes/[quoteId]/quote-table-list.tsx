"use client";

import { QuoteFormValues } from "@/components/providers/quote-context";
import { TableBody } from "@/components/ui/table";
import { useFieldArray, useFormContext } from "react-hook-form";
import QuoteTableItem from "./quote-table-item";

export default function QuoteTableList() {
  const { control } = useFormContext<QuoteFormValues>();
  const { fields } = useFieldArray<QuoteFormValues>({
    name: "rows",
    control,
  });

  return (
    <TableBody>
      {fields.map((row, index) => (
        <QuoteTableItem key={row.id} rowIndex={index} row={row} />
      ))}
    </TableBody>
  );
}
