"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Client } from "@prisma/client";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import CreateClientForm from "./create-client-form";

interface Props {
  client: Client;
}

export default function ClientsListEditSheet({ client }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" onClick={() => setOpen(true)}>
          <IconPencil />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-96">
        <SheetHeader>
          <SheetTitle>Édition de {client.name}</SheetTitle>
          <VisuallyHidden.Root>
            <SheetDescription>Édition de {client.name}</SheetDescription>
          </VisuallyHidden.Root>
        </SheetHeader>
        <CreateClientForm
          clientId={client.id}
          onSubmitSuccess={() => setOpen(false)}
          defaultValues={{
            ...client,
            secondaryPhone: client?.secondaryPhone ?? "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
