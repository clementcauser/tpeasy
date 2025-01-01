import { auth } from "@/lib/auth";
import AppPageLayout from "../app-page-layout";

async function Page() {
  const session = await auth();
  console.log("🚀 ~ Page ~ session:", session);

  return (
    <AppPageLayout breadcrumb={[]} title="Tableau de bord">
      TABLEAU DE BORD
    </AppPageLayout>
  );
}

export default Page;
