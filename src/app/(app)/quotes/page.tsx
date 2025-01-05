import { getAllCompanyQuotesAction } from "@/lib/actions/quotes";
import AppPageLayout from "../app-page-layout";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  const quotes = await getAllCompanyQuotesAction({
    companyId: session?.user?.companyId ?? "",
  });

  return (
    <AppPageLayout breadcrumb={[]} title="Mes devis">
      {quotes?.data?.map((quote) => (
        <p key={quote.id}>{quote.referenceId}</p>
      ))}
    </AppPageLayout>
  );
}
