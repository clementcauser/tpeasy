import { getAllCompanyQuotesAction } from "@/lib/actions/quotes";
import AppPageLayout from "../app-page-layout";
import { auth } from "@/lib/auth";
import CreateQuoteSheet from "./create-quote-sheet";
import Link from "next/link";
import ROUTES from "@/lib/constants/routes";

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
      {quotes?.data?.map((quote) => (
        <Link
          key={quote.id}
          href={ROUTES.quoteDetails.replace("[quoteId]", quote.id)}
        >
          {quote.referenceId}
        </Link>
      ))}
    </AppPageLayout>
  );
}
