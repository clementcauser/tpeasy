import ROUTES from "@/lib/constants/routes";
import AppPageLayout from "../app-page-layout";
import { IconPlus } from "@tabler/icons-react";

export default function Page() {
  return (
    <AppPageLayout
      breadcrumb={[]}
      title="Mes factures"
      action={{
        href: ROUTES.createBills,
        icon: <IconPlus />,
        label: "Créer une facture",
      }}
    >
      FACTURES
    </AppPageLayout>
  );
}
