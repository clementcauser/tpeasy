"use client";

import {
  QuoteFormValues,
  useExtendedQuoteContext,
} from "@/components/providers/quote-context";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalizeFirstLetter, getMoneyPrice } from "@/lib/utils/index";
import {
  getQuoteTaxRateLabel,
  getQuoteTypeLabel,
  getTaxRateValue,
} from "@/lib/utils/quotes";
import { QuoteRow, QuoteRowType, TaxRate } from "@prisma/client";
import { IconBriefcase, IconPackage, IconTrash } from "@tabler/icons-react";
import { ReactNode, useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const getTotalET = (quantity: number, unitPrice: number) =>
  quantity * unitPrice;

const getTotalIT = (totalET: number, taxRate: number) => {
  const taxCoeff = taxRate / 100;
  const taxAmount = taxCoeff * totalET;

  return totalET + taxAmount;
};

export const getQuoteRowTypeIcon = (type: QuoteRowType): ReactNode => {
  const DICTIONNARY: Record<QuoteRowType, ReactNode> = {
    [QuoteRowType.PRODUCT]: <IconPackage />,
    [QuoteRowType.SERVICE]: <IconBriefcase />,
  };

  return DICTIONNARY[type];
};

type Row = QuoteRow & {
  quoteId?: string;
};

interface Props {
  row: Row;
  rowIndex: number;
}

export default function QuoteTableItem({ row, rowIndex }: Props) {
  const { register, control, setValue } = useFormContext<QuoteFormValues>();
  const { removeRow } = useExtendedQuoteContext();

  const totalET = useWatch({ name: `rows.${rowIndex}.totalET`, control });
  const totalIT = useWatch({ name: `rows.${rowIndex}.totalIT`, control });
  const quantity = useWatch({ name: `rows.${rowIndex}.quantity`, control });
  const unitPrice = useWatch({ name: `rows.${rowIndex}.unitPrice`, control });
  const taxRate = useWatch({ name: `rows.${rowIndex}.taxRate`, control });

  const { updatedTotalET, updatedTotalIT } = useMemo(() => {
    const updatedTotalET = getTotalET(quantity, unitPrice);
    const updatedTotalIT = getTotalIT(updatedTotalET, getTaxRateValue(taxRate));

    return { updatedTotalET, updatedTotalIT };
  }, [quantity, unitPrice, taxRate]);

  useEffect(() => {
    setValue(`rows.${rowIndex}.totalET`, updatedTotalET);
    setValue(`rows.${rowIndex}.totalIT`, updatedTotalIT);
  }, [updatedTotalET, updatedTotalIT, setValue, rowIndex]);

  return (
    <TableRow>
      <TableCell className="pl-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{getQuoteRowTypeIcon(row.type)}</TooltipTrigger>
            <TooltipContent>
              <p>{capitalizeFirstLetter(getQuoteTypeLabel(row.type))}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <Input
          {...register(`rows.${rowIndex}.name`)}
          placeholder={`Nom du ${getQuoteTypeLabel(row.type)}`}
        />
      </TableCell>
      <TableCell>
        <Input
          {...register(`rows.${rowIndex}.quantity`, { valueAsNumber: true })}
          type="number"
          step={0.01}
          className="text-right"
        />
      </TableCell>
      <TableCell>
        <Input
          {...register(`rows.${rowIndex}.unit`)}
          step={0.01}
          className="text-right"
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-1">
          <Input
            {...register(`rows.${rowIndex}.unitPrice`, { valueAsNumber: true })}
            type="number"
            step={0.01}
            className="text-right"
          />
          <span>€</span>
        </div>
      </TableCell>
      <TableCell>
        <p className="text-right font-bold">{getMoneyPrice(totalET)}</p>
      </TableCell>
      <TableCell className="text-right">
        <FormField
          control={control}
          name={`rows.${rowIndex}.taxRate`}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une TVA..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(TaxRate).map((rate) => (
                    <SelectItem key={rate} value={rate}>
                      {getQuoteTaxRateLabel(rate as TaxRate)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <p className="text-right font-bold">{getMoneyPrice(totalIT)}</p>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => removeRow(rowIndex)}
          >
            <IconTrash />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
