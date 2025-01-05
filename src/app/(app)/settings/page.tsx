import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppPageLayout from "../app-page-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CompanyLegalForm from "./company-legal-form";
import CompanyGeneralForm from "./company-general-form";

enum TabKey {
  COMPANY = "COMPANY",
  OTHER = "OTHER",
}

export default function Page() {
  return (
    <AppPageLayout breadcrumb={[]} title="Configuration">
      <div className="mt-6">
        <Tabs defaultValue={TabKey.COMPANY}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={TabKey.COMPANY}>Entreprise</TabsTrigger>
            <TabsTrigger value={TabKey.OTHER}>Autre</TabsTrigger>
          </TabsList>
          <TabsContent value={TabKey.COMPANY}>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                  <CardDescription>
                    Ce sont les informations non techniques liées à votre
                    entreprise.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyGeneralForm />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Informations légales</CardTitle>
                  <CardDescription>
                    Certaines de ces informations ne sont pas éditables. Pour ce
                    faire, contactez l&apos;équipe support pour en faire la
                    demande.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyLegalForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value={TabKey.OTHER}></TabsContent>
        </Tabs>
      </div>
    </AppPageLayout>
  );
}
