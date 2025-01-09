"use client";

import { QuoteFormValues } from "@/components/providers/quote-context";
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
import { getQuoteTaxRateLabel, getQuoteTypeLabel } from "@/lib/utils/quotes";
import { QuoteRow, QuoteRowType, TaxRate } from "@prisma/client";
import { IconBriefcase, IconPackage, IconTrash } from "@tabler/icons-react";
import { ReactNode, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const getRowTypeIcon = (type: QuoteRowType): ReactNode => {
  const DICTIONNARY: Record<QuoteRowType, ReactNode> = {
    [QuoteRowType.PRODUCT]: <IconPackage />,
    [QuoteRowType.SERVICE]: <IconBriefcase />,
  };

  return DICTIONNARY[type];
};

const getTaxRateValue = (taxRate: TaxRate): number => {
  const DICTIONNARY: Record<TaxRate, number> = {
    [TaxRate.TAX_10]: 10,
    [TaxRate.TAX_20]: 20,
    [TaxRate.TAX_5_5]: 5.5,
  };

  return DICTIONNARY[taxRate];
};

const getTotalET = (quantity: number, unitPrice: number) =>
  quantity * unitPrice;

const getTotalIT = (totalET: number, taxRate: number) => {
  const taxCoeff = taxRate / 100;
  const taxAmount = taxCoeff * totalET;

  return totalET + taxAmount;
};

type Row = QuoteRow & {
  quoteId?: string;
};

interface Props {
  row: Row;
  rowIndex: number;
}

export default function QuoteTableItem({ row, rowIndex }: Props) {
  const { control, watch, setValue } = useFormContext<QuoteFormValues>();

  const [quantity, unitPrice, taxRate, rows] = watch([
    `rows.${rowIndex}.quantity`,
    `rows.${rowIndex}.unitPrice`,
    `rows.${rowIndex}.taxRate`,
    "rows",
  ]);

  useEffect(() => {
    const updatedTotalET = getTotalET(quantity, unitPrice);
    const updatedTotalIT = getTotalIT(updatedTotalET, getTaxRateValue(taxRate));

    setValue(`rows.${rowIndex}.totalET`, updatedTotalET);
    setValue(`rows.${rowIndex}.totalIT`, updatedTotalIT);

    const ET = rows.reduce((prev, curr) => prev + curr?.totalET, 0);
    const IT = rows.reduce((prev, curr) => prev + curr?.totalIT, 0);

    setValue("totalET", ET);
    setValue("totalIT", IT);
  }, [quantity, unitPrice, taxRate, rows, setValue, rowIndex]);

  return (
    <TableRow>
      <TableCell className="pl-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{getRowTypeIcon(row.type)}</TooltipTrigger>
            <TooltipContent>
              <p>{capitalizeFirstLetter(getQuoteTypeLabel(row.type))}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <FormField
          control={control}
          name={`rows.${rowIndex}.name`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder={`Nom du ${getQuoteTypeLabel(row.type)}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={control}
          name={`rows.${rowIndex}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step={0.01}
                  className="text-right"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-1">
          <FormField
            control={control}
            name={`rows.${rowIndex}.unitPrice`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step={0.01}
                    className="text-right"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span>€</span>
        </div>
      </TableCell>
      <TableCell>
        <FormField
          control={control}
          name={`rows.${rowIndex}.totalET`}
          render={({ field }) => (
            <p className="text-right font-bold">{getMoneyPrice(field.value)}</p>
          )}
        />
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
        <FormField
          control={control}
          name={`rows.${rowIndex}.totalIT`}
          render={({ field }) => (
            <p className="text-right font-bold">{getMoneyPrice(field.value)}</p>
          )}
        />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="destructive"
            size="icon"
            onClick={() => {
              setValue(
                "rows",
                rows.filter((_, i) => i !== rowIndex)
              );
            }}
          >
            <IconTrash />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
