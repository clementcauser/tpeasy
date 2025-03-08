import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PropsWithChildren } from "react";
import QuoteTableFooter from "./quote-table-footer";

export default function QuoteTable({ children }: PropsWithChildren) {
  return (
    <Table>
      <TableCaption hidden>
        Constituez votre devis en ajoutant des services et des produits.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead className="min-w-64">Nom</TableHead>
          <TableHead className="text-right min-w-16">Quantité</TableHead>
          <TableHead className="text-right min-w-24">Unité</TableHead>
          <TableHead className="text-right min-w-32">Prix unitaire</TableHead>
          <TableHead className="text-right min-w-32">Total HT</TableHead>
          <TableHead className="text-right min-w-16">TVA</TableHead>
          <TableHead className="text-right min-w-32">Total TTC</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      {children}
      <QuoteTableFooter />
    </Table>
  );
}
