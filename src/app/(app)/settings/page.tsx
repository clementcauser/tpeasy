import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppPageLayout from "../app-page-layout";
import SettingsCompanyTab from "./settings-company-tab";

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
            <SettingsCompanyTab />
          </TabsContent>
          <TabsContent value={TabKey.OTHER}></TabsContent>
        </Tabs>
      </div>
    </AppPageLayout>
  );
}
