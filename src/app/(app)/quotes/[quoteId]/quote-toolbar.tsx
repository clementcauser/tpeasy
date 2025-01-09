"use client";

import { QuoteRowType } from "@prisma/client";
import AddQuoteRowButton from "./add-quote-row-button";
import QuoteCatalogSheet from "./quote-catalog-sheet";

interface QuoteToolbarProps {
  companyId: string;
  quoteId: string;
  rowsCount: number;
}

function QuoteToolbar({ companyId, quoteId, rowsCount }: QuoteToolbarProps) {
  return (
    <div className="flex items-center gap-2 mb-4 mt-2 lg:mb-0 lg:mt-0">
      <AddQuoteRowButton
        quoteId={quoteId}
        companyId={companyId}
        rowsCount={rowsCount}
        type={QuoteRowType.SERVICE}
      />
      <AddQuoteRowButton
        quoteId={quoteId}
        companyId={companyId}
        rowsCount={rowsCount}
        type={QuoteRowType.PRODUCT}
      />
      <QuoteCatalogSheet companyId={companyId} />
    </div>
  );
}

export default QuoteToolbar;
