import ROUTES from "@/lib/constants/routes";
import AppPageLayout from "../app-page-layout";
import { IconPlus } from "@tabler/icons-react";

export default function Page() {
  return (
    <AppPageLayout
      breadcrumb={[]}
      title="Mes clients"
      action={{
        href: ROUTES.createClients,
        icon: <IconPlus />,
        label: "Ajouter un client",
      }}
    >
      CLIENTS
    </AppPageLayout>
  );
}
