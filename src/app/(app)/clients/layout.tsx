"use client";

import { IconPlus } from "@tabler/icons-react";
import AppPageLayout from "../app-page-layout";
import { PropsWithChildren } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CreateClientForm from "./create-client-form";

export default function Layout({ children }: PropsWithChildren) {
  const isDesktop = window.matchMedia("(min-width: 769px)").matches;

  return (
    <Sheet>
      <AppPageLayout
        breadcrumb={[]}
        title="Mes clients"
        action={{
          type: "component",
          component: (
            <SheetTrigger asChild>
              <Button>
                <IconPlus />{" "}
                <span className="hidden md:block">Ajouter un client</span>
              </Button>
            </SheetTrigger>
          ),
        }}
      >
        {children}
        <SheetContent side={isDesktop ? "right" : "bottom"}>
          <SheetHeader>
            <SheetTitle>Création de client</SheetTitle>
            <SheetDescription>
              Ajouter un client à votre répertoire va vous permettre de le
              sélectionner directement lorsque vous créérez un devis ou une
              facture sans avoir à ajouter de nouvelles informations. Cela est
              particulièrement utile lorsque vous travaillez régulièrement avec
              les mêmes clients.
            </SheetDescription>
            <CreateClientForm />
          </SheetHeader>
        </SheetContent>
      </AppPageLayout>
    </Sheet>
  );
}
