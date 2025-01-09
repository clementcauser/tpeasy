import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IconListDetails } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  companyId: string;
}

export default function QuoteCatalogSheet({ companyId }: Props) {
  return (
    <Sheet>
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
        <Tabs className="mt-4 w-full">
          <TabsList className="flex">
            <TabsTrigger className="flex-1" value="services">
              Services
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="products">
              Produits
            </TabsTrigger>
          </TabsList>
          <TabsContent value="services">MES SERVICES</TabsContent>
          <TabsContent value="products">MES PRODUITS</TabsContent>
        </Tabs>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="mt-4">Fermer</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
