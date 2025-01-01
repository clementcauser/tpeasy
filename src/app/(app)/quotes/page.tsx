import ROUTES from "@/lib/constants/routes";
import AppPageLayout from "../app-page-layout";
import { IconPlus } from "@tabler/icons-react";

export default function Page() {
  return (
    <AppPageLayout
      breadcrumb={[]}
      title="Mes devis"
      action={{
        href: ROUTES.createQuotes,
        icon: <IconPlus />,
        label: "Créer un devis",
      }}
    >
      DEVIS
    </AppPageLayout>
  );
}
