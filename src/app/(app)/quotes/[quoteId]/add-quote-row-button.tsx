"use client";

import { QuoteFormValues } from "@/components/providers/quote-context";
import { Button } from "@/components/ui/button";
import { getQuoteTypeLabel } from "@/lib/utils/quotes";
import { createId } from "@paralleldrive/cuid2";
import { QuoteRow, QuoteRowType, TaxRate } from "@prisma/client";
import { IconBriefcase, IconPackage } from "@tabler/icons-react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

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
  companyId: string;
  quoteId: string;
  type: QuoteRowType;
  rowsCount: number;
}

export default function AddQuoteRowButton({
  companyId,
  quoteId,
  type,
  rowsCount,
}: Props) {
  const rowType = getQuoteTypeLabel(type);
  const { setValue, watch } = useFormContext<QuoteFormValues>();

  const rows = watch("rows");

  const DEFAULT_VALUES: DefaultValuesType = {
    companyId: companyId ?? "",
    description: "",
    name: `Nouveau ${rowType}...`,
    quantity: 1,
    quoteId,
    taxRate: TaxRate.TAX_20,
    totalET: 1,
    totalIT: 1.2,
    type,
    unitPrice: 1,
    order: rowsCount + 1,
    unit: "unités",
    id: createId(),
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() =>
        setValue("rows", [...rows, DEFAULT_VALUES], { shouldDirty: true })
      }
    >
      {getRowTypeIcon(type)} Ajouter {rowType}
    </Button>
  );
}
