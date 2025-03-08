import QuoteProvider from "@/components/providers/quote-context";
import { getQuoteByIdAction } from "@/lib/actions/quotes";
import { auth } from "@/lib/auth";
import { IconLoader } from "@tabler/icons-react";
import { Suspense } from "react";
import QuoteClientCard from "./quote-client-card";
import QuoteComment from "./quote-comment";
import QuoteLayout from "./quote-layout";
import QuoteSaveButton from "./quote-save-button";
import QuoteTable from "./quote-table";
import QuoteTableList from "./quote-table-list";
import QuoteTaxToggle from "./quote-tax-toggle";

interface PageProps {
  params: Promise<{ quoteId: string }>;
}

async function Page({ params }: PageProps) {
  const session = await auth();
  const { quoteId } = await params;

  return (
    <Suspense>
      {session?.user?.companyId && quoteId && (
        <Content quoteId={quoteId} companyId={session.user.companyId} />
      )}
    </Suspense>
  );
}

interface ContentProps {
  companyId: string;
  quoteId: string;
}

async function Content({ companyId, quoteId }: ContentProps) {
  const response = await getQuoteByIdAction({ companyId, id: quoteId });
  const quote = response?.data;
  const rowsCount = quote?.rows?.length ?? 0;

  if (quote) {
    return (
      <QuoteProvider quote={quote}>
        {quote && (
          <QuoteLayout quote={quote} rowsCount={rowsCount}>
            <QuoteTable>
              <QuoteTableList />
            </QuoteTable>
            <div className="mt-8 mb-4">
              <QuoteTaxToggle />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <QuoteComment />
              </div>
              <QuoteClientCard quoteId={quote.id} client={quote.client} />
            </div>
            <div>
              <QuoteSaveButton className="mt-4" />
            </div>
          </QuoteLayout>
        )}
      </QuoteProvider>
    );
  } else {
    return <IconLoader className="animate-spin" />;
  }
}

export default Page;
