import QuoteProvider from "@/components/providers/quote-context";
import { getQuoteByIdAction } from "@/lib/actions/quotes";
import { auth } from "@/lib/auth";
import { IconDeviceFloppy, IconLoader } from "@tabler/icons-react";
import { Suspense } from "react";
import QuoteLayout from "./quote-layout";
import QuoteTable from "./quote-table";
import QuoteTableList from "./quote-table-list";
import QuoteComment from "./quote-comment";
import QuoteClientCard from "./quote-client-card";
import { Button } from "@/components/ui/button";

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <QuoteComment />
              <QuoteClientCard client={quote.client} />
              <div>
                <Button className="mt-2" type="submit">
                  <IconDeviceFloppy /> Sauvegarder
                </Button>
              </div>
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
