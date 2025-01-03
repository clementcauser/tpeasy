import AppPageLayout from "../app-page-layout";
import { Suspense } from "react";
import ClientsCountCard, {
  ClientsCountCardLoading,
} from "./clients-count-card";
import { auth } from "@/lib/auth";

async function Page() {
  const session = await auth();
  return (
    <AppPageLayout breadcrumb={[]} title="Tableau de bord">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 mt-6">
        {session?.user?.companyId && (
          <Suspense fallback={<ClientsCountCardLoading />}>
            <ClientsCountCard companyId={session.user.companyId} />
          </Suspense>
        )}
      </div>
    </AppPageLayout>
  );
}

export default Page;
