import { Client, Quote } from "@prisma/client";
import { quotesListColumns } from "./quotes-list-columns";
import { DataTable } from "./quotes-list-data-table";

interface Props {
  quotes: (Quote & { client: Client })[];
}

export default function QuotesList({ quotes }: Props) {
  return <DataTable columns={quotesListColumns} data={quotes} />;
}
