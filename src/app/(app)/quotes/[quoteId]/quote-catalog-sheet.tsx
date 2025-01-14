"use client";

import { useExtendedQuoteContext } from "@/components/providers/quote-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllCompanyQuoteRowsAction } from "@/lib/actions/quotes";
import { QuoteRowType } from "@prisma/client";
import { IconListDetails } from "@tabler/icons-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import QuoteCatalogRows from "./quote-catalog-rows";

interface Props {
  companyId: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function QuoteCatalogSheet({ companyId }: Props) {
  const { catalog } = useExtendedQuoteContext();
  const [selectedTab, setSelectedTab] = useState<"services" | "products">(
    "services"
  );

  const { execute, result, isPending } = useAction(
    getAllCompanyQuoteRowsAction
  );

  useEffect(() => {
    if (catalog.isOpen) {
      if (selectedTab === "services") {
        execute({ companyId, type: QuoteRowType.SERVICE });
      } else {
        execute({ companyId, type: QuoteRowType.PRODUCT });
      }
    }
  }, [companyId, selectedTab, catalog.isOpen, execute]);

  return (
    <Sheet open={catalog.isOpen} onOpenChange={catalog.setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" type="button">
          <IconListDetails /> Voir catalogue
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-xl lg:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Catalogue de services et produits</SheetTitle>
          <SheetDescription>
            Choisissez parmi vos services et produits déjà enregistrés ce dont
            vous avez besoin.
          </SheetDescription>
        </SheetHeader>
        <Tabs
          className="mt-4 w-full"
          value={selectedTab}
          onValueChange={(tab) =>
            setSelectedTab(tab as "services" | "products")
          }
        >
          <TabsList className="flex">
            <TabsTrigger
              disabled={isPending}
              className="flex-1"
              value="services"
            >
              Services
            </TabsTrigger>
            <TabsTrigger
              disabled={isPending}
              className="flex-1"
              value="products"
            >
              Produits
            </TabsTrigger>
          </TabsList>
          <TabsContent value="services">
            <QuoteCatalogRows isLoading={isPending} rows={result?.data ?? []} />
          </TabsContent>
          <TabsContent value="products">
            <QuoteCatalogRows isLoading={isPending} rows={result?.data ?? []} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
