import { QuoteRowType } from "@prisma/client";
import AddQuoteRowButton from "./add-quote-row-button";
import QuoteCatalogSheet from "./quote-catalog-sheet";
import QuoteSaveButton from "./quote-save-button";

interface QuoteToolbarProps {
  companyId: string;
  quoteId: string;
  rowsCount: number;
}

function QuoteToolbar({ companyId, quoteId, rowsCount }: QuoteToolbarProps) {
  return (
    <div className="flex justify-between items-center gap-6 mb-4 mt-2 lg:mb-2 lg:mt-0">
      <div className="flex items-center gap-2">
        <AddQuoteRowButton
          quoteId={quoteId}
          rowsCount={rowsCount}
          type={QuoteRowType.SERVICE}
        />
        <AddQuoteRowButton
          quoteId={quoteId}
          rowsCount={rowsCount}
          type={QuoteRowType.PRODUCT}
        />
        <QuoteCatalogSheet companyId={companyId} />
      </div>
      <QuoteSaveButton />
    </div>
  );
}

export default QuoteToolbar;
