"use client";

import { useExtendedQuoteContext } from "@/components/providers/quote-context";
import { TableBody } from "@/components/ui/table";
import QuoteTableItem from "./quote-table-item";

export default function QuoteTableList() {
  const { rows } = useExtendedQuoteContext();

  return (
    <TableBody>
      {rows.map((row, index) => (
        <QuoteTableItem
          key={row.id}
          rowIndex={index}
          row={{ ...row, quoteId: row?.quoteId ?? "" }}
        />
      ))}
    </TableBody>
  );
}
