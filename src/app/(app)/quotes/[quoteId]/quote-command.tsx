"use client";

import { useExtendedQuoteContext } from "@/components/providers/quote-context";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { capitalizeFirstLetter } from "@/lib/utils/index";
import { getQuoteTypeLabel } from "@/lib/utils/quotes";
import { createId } from "@paralleldrive/cuid2";
import { QuoteRow, QuoteRowType, TaxRate } from "@prisma/client";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconListDetails,
  IconPackage,
  IconPencil,
  IconSend,
  IconUser,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import QuoteTitleDialog from "./quote-title-dialog";
import QuoteClientSheet from "./quote-client-sheet";

type DefaultValuesType = QuoteRow & {
  description?: string;
  quoteId?: string;
};

const createRow =
  (quoteId: string, rowType: QuoteRowType, rowsCount: number) =>
  (addRowFn: (row: QuoteRow) => void) => {
    const type = getQuoteTypeLabel(rowType);

    const DEFAULT_VALUES: DefaultValuesType = {
      description: "",
      name: capitalizeFirstLetter(type),
      quantity: 1,
      quoteId,
      taxRate: TaxRate.TAX_20,
      totalET: 1,
      totalIT: 1.2,
      type: rowType,
      unitPrice: 1,
      order: rowsCount + 1,
      unit: "unité",
      id: createId(),
    };

    addRowFn(DEFAULT_VALUES);
  };

interface Props {
  quoteId: string;
  companyId: string;
  selectedClientId: string;
}

export default function QuoteCommand({
  quoteId,
  companyId,
  selectedClientId,
}: Props) {
  const [open, setOpen] = useState(false);
  const [openTitleDialog, setOpenTitleDialog] = useState(false);
  const [isClientSheetOpen, setIsClientSheetOpen] = useState(false);

  const { addRow, rows, catalog, submitForm } = useExtendedQuoteContext();
  const doActionAndCloseCommands = (actionFn: () => void) => {
    actionFn();
    setOpen(false);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();

        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:block text-sm bg-muted text-muted-foreground hover:text-black px-3 py-1 rounded-lg border"
      >
        Faire une action rapide...{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">/</span>{" "}
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden.Root>
          <DialogTitle>Commandes rapides</DialogTitle>
          <DialogDescription>
            Menu pour accéder aux actions rapides du devis
          </DialogDescription>
        </VisuallyHidden.Root>
        <CommandInput placeholder="Rechercher une commande rapide..." />
        <CommandList>
          <CommandEmpty>Aucun résultat</CommandEmpty>
          <CommandGroup heading="Ajouter">
            <CommandItem
              onSelect={() =>
                doActionAndCloseCommands(() =>
                  createRow(quoteId, QuoteRowType.SERVICE, rows.length)(addRow)
                )
              }
            >
              <IconBriefcase /> Ajouter service
            </CommandItem>
            <CommandItem
              onSelect={() =>
                doActionAndCloseCommands(() =>
                  createRow(quoteId, QuoteRowType.PRODUCT, rows.length)(addRow)
                )
              }
            >
              <IconPackage /> Ajouter produit
            </CommandItem>
            <CommandItem
              onSelect={() =>
                doActionAndCloseCommands(() => catalog.setIsOpen(true))
              }
            >
              <IconListDetails />
              Ouvrir catalogue
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Modifier">
            <CommandItem
              onSelect={() =>
                doActionAndCloseCommands(() => setOpenTitleDialog(true))
              }
            >
              <IconPencil /> Changer le titre
            </CommandItem>
            <CommandItem
              onSelect={() =>
                doActionAndCloseCommands(() => setIsClientSheetOpen(true))
              }
            >
              <IconUser />
              Changer de client
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Sauvegarder">
            <CommandItem onSelect={submitForm}>
              <IconDeviceFloppy /> Sauvegarder
            </CommandItem>
            <CommandItem>
              <IconSend />
              Sauvegarder et envoyer
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <QuoteTitleDialog
        isOpen={openTitleDialog}
        onOpenChange={setOpenTitleDialog}
      />
      <QuoteClientSheet
        isOpen={isClientSheetOpen}
        setIsOpen={setIsClientSheetOpen}
        companyId={companyId}
        quoteId={quoteId}
        selectedClientId={selectedClientId}
      />
    </>
  );
}
