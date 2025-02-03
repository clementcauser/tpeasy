import { getAllCompanyQuotesAction } from "@/lib/actions/quotes";
import { auth } from "@/lib/auth";
import AppPageLayout from "../app-page-layout";
import CreateQuoteSheet from "./create-quote-sheet";
import QuotesList from "./quotes-list";

export default async function Page() {
  const session = await auth();
  const quotes = await getAllCompanyQuotesAction({
    companyId: session?.user?.companyId ?? "",
  });

  return (
    <AppPageLayout
      breadcrumb={[]}
      title="Mes devis"
      action={{
        type: "component",
        component: <CreateQuoteSheet />,
      }}
    >
      <div className="pt-6">
        {quotes?.data && <QuotesList quotes={quotes?.data} />}
      </div>
    </AppPageLayout>
  );
}
