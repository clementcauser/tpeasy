"use client";

import { Badge } from "@/components/ui/badge";

import ROUTES from "@/lib/constants/routes";
import { getMoneyPrice } from "@/lib/utils/index";
import { getQuoteStatusData } from "@/lib/utils/quotes";
import { Client, Quote } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import QuoteActions from "./quotes-list-item-options";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const quotesListColumns: ColumnDef<Quote & { client: Client }>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Titre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Link href={ROUTES.quoteDetails.replace("[quoteId]", row.original.id)}>
        <span className="text-primary">{row.getValue("title")}</span>
      </Link>
    ),
  },
  {
    accessorKey: "client.name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Client
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Statut
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant="secondary">
        {getQuoteStatusData(row.getValue("status")).label}
      </Badge>
    ),
  },
  {
    accessorKey: "expirationDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date d&apos;expiration
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => format(row.getValue("expirationDate"), "dd/MM/yyyy"),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date de création
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => format(row.getValue("createdAt"), "dd/MM/yyyy"),
  },
  {
    accessorKey: "totalET",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Total HT</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-right">{getMoneyPrice(row.getValue("totalET"))}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <QuoteActions quote={row.original} />;
    },
  },
];
