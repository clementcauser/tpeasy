"use client";

import { useExtendedQuoteContext } from "@/components/providers/quote-context";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/utils/index";
import { getQuoteTypeLabel } from "@/lib/utils/quotes";
import { createId } from "@paralleldrive/cuid2";
import { QuoteRow, QuoteRowType, TaxRate } from "@prisma/client";
import { IconBriefcase, IconPackage } from "@tabler/icons-react";
import { ReactNode } from "react";

const getRowTypeIcon = (type: QuoteRowType): ReactNode => {
  const DICTIONNARY: Record<QuoteRowType, ReactNode> = {
    [QuoteRowType.PRODUCT]: <IconPackage />,
    [QuoteRowType.SERVICE]: <IconBriefcase />,
  };

  return DICTIONNARY[type];
};

type DefaultValuesType = QuoteRow & {
  description?: string;
  quoteId?: string;
};

interface Props {
  quoteId: string;
  type: QuoteRowType;
  rowsCount: number;
}

export default function AddQuoteRowButton({ quoteId, type, rowsCount }: Props) {
  const rowType = getQuoteTypeLabel(type);

  const { addRow } = useExtendedQuoteContext();

  const DEFAULT_VALUES: DefaultValuesType = {
    description: "",
    name: capitalizeFirstLetter(rowType),
    quantity: 1,
    quoteId,
    taxRate: TaxRate.TAX_20,
    totalET: 1,
    totalIT: 1.2,
    type,
    unitPrice: 1,
    order: rowsCount + 1,
    unit: "unité",
    id: createId(),
  };

  return (
    <>
      <Button
        className="hidden md:flex"
        type="button"
        variant="outline"
        onClick={() => addRow(DEFAULT_VALUES)}
      >
        {getRowTypeIcon(type)} Ajouter {rowType}
      </Button>
      <Button
        className="flex md:hidden"
        size="icon"
        type="button"
        variant="outline"
        onClick={() => addRow(DEFAULT_VALUES)}
      >
        {getRowTypeIcon(type)}
      </Button>
    </>
  );
}
