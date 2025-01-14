import { Quote } from "@prisma/client";
import { PropsWithChildren } from "react";
import QuoteCommand from "./quote-command";
import QuoteToolbar from "./quote-toolbar";

interface Props {
  quote: Quote;
  rowsCount: number;
}

function QuoteLayout({ children, quote, rowsCount }: PropsWithChildren<Props>) {
  return (
    <div className="overflow-auto">
      <div className="flex justify-between gap-6 items-center">
        <h1 className="font-bold text-2xl">{quote.title}</h1>
        {quote?.companyId && (
          <QuoteCommand companyId={quote.companyId} quoteId={quote.id} />
        )}
      </div>
      <p className="text-muted-foreground text-sm">{quote.referenceId}</p>
      <div className="py-4">
        {quote.companyId && (
          <QuoteToolbar
            companyId={quote.companyId}
            quoteId={quote.id}
            rowsCount={rowsCount}
          />
        )}
        {children}
      </div>
    </div>
  );
}

export default QuoteLayout;
