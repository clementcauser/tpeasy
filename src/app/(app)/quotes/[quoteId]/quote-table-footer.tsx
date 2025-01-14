"use client";

import { QuoteFormValues } from "@/components/providers/quote-context";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { getMoneyPrice } from "@/lib/utils/index";
import { QuoteRow } from "@prisma/client";
import { useFormContext, UseFormSetValue, useWatch } from "react-hook-form";

export default function QuoteTableFooter() {
  const { setValue } = useFormContext<QuoteFormValues>();

  return (
    <TableFooter>
      <TableRow className="">
        <TableCell colSpan={5} className="bg-white" />
        <TableCell colSpan={2} className="border-b text-lg">
          Total HT
        </TableCell>
        <TableCell colSpan={2} className="text-right font-bold border-b">
          <TotalComponent setValue={setValue} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} className="bg-white" />
        <TableCell colSpan={2} className="text-lg">
          Total TTC
        </TableCell>
        <TableCell colSpan={2} className="text-right font-bold">
          <TotalComponent includeTaxes setValue={setValue} />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}

const computeTotals = (rows: QuoteRow[]) => {
  const totalET = rows.reduce((acc, row) => acc + row.totalET, 0);
  const totalIT = rows.reduce((acc, row) => acc + row.totalIT, 0);

  return { totalET, totalIT };
};

const TotalComponent = ({
  includeTaxes = false,
  setValue,
}: {
  includeTaxes?: boolean;
  setValue: UseFormSetValue<QuoteFormValues>;
}) => {
  const rows = useWatch({ name: "rows" });
  const { totalET, totalIT } = computeTotals(rows);

  setValue(
    includeTaxes ? "totalIT" : "totalET",
    includeTaxes ? totalIT : totalET
  );

  return (
    <p className="text-right font-bold text-lg">
      {getMoneyPrice(includeTaxes ? totalIT : totalET)}
    </p>
  );
};
