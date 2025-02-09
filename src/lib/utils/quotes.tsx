import { QuoteRowType, QuoteStatus, TaxRate } from "@prisma/client";
import {
  Icon,
  IconCheck,
  IconClockCancel,
  IconNotes,
  IconProps,
  IconSend,
  IconX,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { companyPrefixRegex } from "../constants/companies";

export const buildDefaultQuotePrefix = (companyPrefix: string, date: Date) => {
  const month =
    date.getMonth() < 10
      ? `0${date.getMonth() + 1}`
      : date.getMonth().toString();

  return `${companyPrefix}_${date.getFullYear()}-${month}-0001`;
};

export const incrementQuotePrefix = (lastQuoteReferenceId: string) => {
  const isValid = companyPrefixRegex.test(lastQuoteReferenceId);

  if (isValid) {
    const newReferenceSuffix = (
      parseInt(lastQuoteReferenceId.substring(12, 16), 10) + 1
    ).toString();
    const newReferenceSuffixWithLeadingZeros = newReferenceSuffix.padStart(
      4,
      "0"
    );

    return (
      lastQuoteReferenceId.substring(0, 12) + newReferenceSuffixWithLeadingZeros
    );
  } else {
    throw Error("The given quote reference id is not valid");
  }
};

export const getQuoteTypeLabel = (type: QuoteRowType) => {
  const DICTIONNARY: Record<QuoteRowType, string> = {
    [QuoteRowType.PRODUCT]: "produit",
    [QuoteRowType.SERVICE]: "service",
  };

  return DICTIONNARY[type];
};

export const getQuoteTaxRateLabel = (taxRate: TaxRate) => {
  const DICTIONNARY: Record<TaxRate, string> = {
    [TaxRate.TAX_5_5]: "5,5%",
    [TaxRate.TAX_10]: "10%",
    [TaxRate.TAX_20]: "20%",
    [TaxRate.TAX_0]: "0%",
  };

  return DICTIONNARY[taxRate];
};

export const getTaxRateValue = (taxRate: TaxRate): number => {
  const DICTIONNARY: Record<TaxRate, number> = {
    [TaxRate.TAX_10]: 10,
    [TaxRate.TAX_20]: 20,
    [TaxRate.TAX_5_5]: 5.5,
    [TaxRate.TAX_0]: 0,
  };

  return DICTIONNARY[taxRate];
};

type IconType = ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;

export const getQuoteStatusData = (
  status: QuoteStatus
): { label: string; icon: IconType } => {
  const DICTIONNARY: Record<
    QuoteStatus,
    {
      label: string;
      icon: IconType;
    }
  > = {
    [QuoteStatus.DRAFT]: { label: "Brouillon", icon: IconNotes },
    [QuoteStatus.PENDING]: { label: "Envoyé", icon: IconSend },
    [QuoteStatus.ACCEPTED]: { label: "Accepté", icon: IconCheck },
    [QuoteStatus.REJECTED]: { label: "Refusé", icon: IconX },
    [QuoteStatus.EXPIRED]: { label: "Expiré", icon: IconClockCancel },
  };

  return DICTIONNARY[status];
};

export function getRemainingQuoteStatuses(
  currentStatus: QuoteStatus
): QuoteStatus[] {
  switch (currentStatus) {
    case QuoteStatus.DRAFT:
      return Object.keys(QuoteStatus) as QuoteStatus[];

    case QuoteStatus.PENDING:
      return Object.keys(QuoteStatus).filter(
        (status) => status !== QuoteStatus.DRAFT
      ) as QuoteStatus[];

    case QuoteStatus.EXPIRED:
    case QuoteStatus.REJECTED:
    case QuoteStatus.ACCEPTED:
      return [];
  }
}
