"use client";

import { useCurrentCompany } from "@/components/providers/company-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CreateQuoteForm from "./create-quote-form";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ROUTES from "@/lib/constants/routes";

export default function CreateQuoteSheet() {
  const [open, setOpen] = useState(false);
  const { data } = useSession();
  const { company } = useCurrentCompany();
  const { push } = useRouter();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button disabled={!company} onClick={() => setOpen(true)}>
          <IconPlus /> <span className="hidden md:block">Créer un devis</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Création d&apos;un devis</SheetTitle>
          <SheetDescription>
            Nous avons besoin de ces quelques informations pour initialiser un
            nouveau devis.
          </SheetDescription>
          {company && data?.user && (
            <CreateQuoteForm
              onSubmitSuccess={(quote) =>
                !!quote &&
                push(ROUTES.quoteDetails.replace("[quoteId]", quote.id))
              }
              userId={data?.user?.id}
              company={company}
            />
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
