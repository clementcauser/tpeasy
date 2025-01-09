import { Button } from "@/components/ui/button";
import { Quote } from "@prisma/client";
import { PropsWithChildren } from "react";
import QuoteToolbar from "./quote-toolbar";
import { IconDeviceFloppy } from "@tabler/icons-react";

interface Props {
  quote: Quote;
  rowsCount: number;
}

function QuoteLayout({ children, quote, rowsCount }: PropsWithChildren<Props>) {
  return (
    <div className="overflow-auto">
      <div className="flex justify-between gap-6 items-center">
        <h1 className="font-bold text-2xl">{quote.title}</h1>
        <Button type="submit">
          <IconDeviceFloppy /> Sauvegarder
        </Button>
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
