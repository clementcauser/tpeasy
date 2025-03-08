"use client";

import { useExtendedQuoteContext } from "@/components/providers/quote-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getCompanyClientsAction } from "@/lib/actions/clients";
import { changeQuoteClientAction } from "@/lib/actions/quotes";
import { cn } from "@/lib/utils";
import { Client } from "@prisma/client";
import { IconLoader, IconSwitch } from "@tabler/icons-react";
import { useAction } from "next-safe-action/hooks";
import { PropsWithChildren, useEffect, useState } from "react";

interface Props {
  companyId: string;
  selectedClientId: string;
  quoteId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function QuoteClientSheet({
  companyId,
  selectedClientId,
  quoteId,
  isOpen,
  setIsOpen,
  children,
}: PropsWithChildren<Props>) {
  const [selectedClient, setSelectedClient] =
    useState<string>(selectedClientId);

  const { execute, isPending, result } = useAction(getCompanyClientsAction);
  const { execute: onClientChange, isPending: onClientChangePending } =
    useAction(changeQuoteClientAction, { onSuccess: () => setIsOpen(false) });

  useEffect(() => {
    if (isOpen) {
      execute({ companyId });
    }
  }, [execute, companyId, isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Changement de client</SheetTitle>
          <SheetDescription>
            Vous pouvez à tout moment changer le client associé à ce devis.
          </SheetDescription>
        </SheetHeader>
        {isPending ? (
          <div className="flex flex-1 justify-center items-center min-h-48">
            Chargement...
          </div>
        ) : (
          result?.data && (
            <ClientsPicker
              selectedClientId={selectedClient}
              setSelectedClientId={(selected) => setSelectedClient(selected)}
              clients={result?.data}
            />
          )
        )}
        <SheetFooter className="flex justify-end gap-2 mt-8">
          <Button
            className="order-2 md:order-1"
            disabled={onClientChangePending}
            type="button"
            onClick={() =>
              onClientChange({ quoteId, clientId: selectedClient })
            }
          >
            Sauvegarder{" "}
            {onClientChangePending && <IconLoader className="animate-spin" />}
          </Button>
          <SheetClose asChild>
            <Button
              className="order-1 md:order-2"
              disabled={onClientChangePending}
              type="button"
              variant="secondary"
            >
              Annuler
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface QuoteClientSheetWithButtonProps {
  companyId: string;
  selectedClientId: string;
  quoteId: string;
}

export function QuoteClientSheetWithButton({
  companyId,
  quoteId,
  selectedClientId,
}: QuoteClientSheetWithButtonProps) {
  const { isEditable } = useExtendedQuoteContext();
  const [open, setOpen] = useState(false);

  if (isEditable) {
    return (
      <QuoteClientSheet
        companyId={companyId}
        quoteId={quoteId}
        selectedClientId={selectedClientId}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
          <IconSwitch /> Changer de client
        </Button>
      </QuoteClientSheet>
    );
  } else {
    return null;
  }
}

interface ClientListProps {
  clients: Client[];
  selectedClientId: string;
  setSelectedClientId: (id: string) => void;
}

const ClientsPicker = ({
  clients,
  selectedClientId,
  setSelectedClientId,
}: ClientListProps) => {
  return (
    <ul className="mt-4 flex flex-col gap-2">
      {clients.map((client) => (
        <li key={client.id}>
          <button
            type="button"
            onClick={() => setSelectedClientId(client.id)}
            className={cn(
              "cursor-pointer flex w-full items-center gap-2 rounded border-2 bg-slate-50 hover:shadow transition-shadow px-2 py-4",
              selectedClientId === client.id
                ? "border-primary"
                : "border-transparent"
            )}
          >
            <p className="font-bold">{client.name}</p>
            <p className="text-sm">{client.address}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};
