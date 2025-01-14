"use client";

import { quoteFormSchema } from "@/lib/validation/quotes";
import { Quote, QuoteRow } from "@prisma/client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Control, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { LeavingDialog } from "../misc/leaving-dialog";

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
type QuoteWithRows = Quote & { rows: QuoteRow[] };

const formatDefaultValues = (quote: QuoteWithRows): QuoteFormValues => ({
  ...quote,
  companyId: quote?.companyId ?? "",
  comment: quote?.comment ?? "",
  rows: [
    ...quote.rows.map((row) => ({
      ...row,
      quoteId: row?.quoteId ?? "",
    })),
  ],
});

interface Props {
  quote: QuoteWithRows;
}

export default function QuoteProvider({
  children,
  quote,
}: PropsWithChildren<Props>) {
  const form = useForm<QuoteFormValues>({
    defaultValues: formatDefaultValues(quote),
  });

  const onSubmit = (values: QuoteFormValues) => console.log(values);

  return (
    <FormProvider {...form}>
      <ExtendedQuoteContextProvider control={form.control}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
        <LeavingDialog
          enabled={form.formState.isDirty}
          onCancel={() => console.log(form.getValues())}
          onConfirm={() => console.log("SAVE VALUES")}
        />
      </ExtendedQuoteContextProvider>
    </FormProvider>
  );
}

type QuoteFieldArrayContextType = {
  addRow: (row: QuoteRow) => void;
  removeRow: (rowIndex: number) => void;
  updateRow: (rowIndex: number, updatedRow: QuoteRow) => void;
  rows: QuoteRow[];
  catalog: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void };
};

const QuoteFieldArrayContext = createContext<QuoteFieldArrayContextType>({
  addRow: () => ({}),
  removeRow: () => ({}),
  updateRow: () => ({}),
  rows: [],
  catalog: { isOpen: false, setIsOpen: () => {} },
});

interface ExtendedQuoteContextProviderProps {
  control: Control<QuoteFormValues>;
}

const ExtendedQuoteContextProvider = ({
  children,
  control,
}: PropsWithChildren<ExtendedQuoteContextProviderProps>) => {
  const [catalog, setCatalog] = useState(false);
  const { append, remove, update, fields } = useFieldArray<QuoteFormValues>({
    name: "rows",
    control: control,
  });

  return (
    <QuoteFieldArrayContext.Provider
      value={{
        addRow: (row) =>
          append({
            ...row,
            order: fields.length + 1,
            quoteId: row?.quoteId ?? "",
          }),
        removeRow: (index) => remove(index),
        updateRow: (index, row) =>
          update(index, { ...row, quoteId: row?.quoteId ?? "" }),
        rows: fields,
        catalog: { isOpen: catalog, setIsOpen: setCatalog },
      }}
    >
      {children}
    </QuoteFieldArrayContext.Provider>
  );
};

export const useExtendedQuoteContext = () => useContext(QuoteFieldArrayContext);
