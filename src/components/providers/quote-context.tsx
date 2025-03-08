"use client";

import { quoteFormSchema } from "@/lib/validation/quotes";
import { Quote, QuoteRow } from "@prisma/client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Control, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { LeavingDialog } from "../misc/leaving-dialog";
import { useAction } from "next-safe-action/hooks";
import { updateQuoteAction } from "@/lib/actions/quotes";
import { useToast } from "@/hooks/use-toast";

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
type QuoteWithRows = Quote & { rows: QuoteRow[] };

const formatDefaultValues = (quote: QuoteWithRows): QuoteFormValues => ({
  ...quote,
  latePenalties: quote?.latePenalties ?? "",
  paymentTerms: quote?.paymentTerms ?? "",
  companyId: quote?.companyId ?? "",
  comment: quote?.comment ?? "",
  rows: [
    ...quote.rows.map((row) => ({
      ...row,
      ...{ description: row?.description ?? undefined },
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
  const { toast } = useToast();
  const form = useForm<QuoteFormValues>({
    defaultValues: formatDefaultValues(quote),
  });

  const { execute, isPending } = useAction(updateQuoteAction, {
    onError: () =>
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite pendant la sauvegarde du devis",
        variant: "destructive",
      }),
    onSuccess: (values) => {
      if (values?.data) {
        form.reset(formatDefaultValues(values.data));

        toast({
          title: "Mis à jour",
          description: "Votre devis a été mis à jour avec succès",
        });
      }
    },
  });

  const onSubmit = (values: QuoteFormValues) => {
    execute(values);
  };

  return (
    <FormProvider {...form}>
      <ExtendedQuoteContextProvider
        isEditable={quote.status === "DRAFT"}
        isSubmitting={isPending}
        control={form.control}
        onSubmit={() => {
          const values = form.getValues();

          onSubmit(values);
        }}
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
        <LeavingDialog
          enabled={form.formState.isDirty}
          onCancel={() => console.log(form.getValues())}
          onConfirm={() => {
            onSubmit(form.getValues());
          }}
        />
      </ExtendedQuoteContextProvider>
    </FormProvider>
  );
}

type QuoteFieldArrayContextType = {
  addRow: (row: Omit<QuoteRow, "id"> & { id?: QuoteRow["id"] }) => void;
  removeRow: (rowIndex: number) => void;
  updateRow: (rowIndex: number, updatedRow: QuoteRow) => void;
  rows: QuoteRow[];
  catalog: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void };
  submitForm: () => void;
  isSubmitting: boolean;
  isEditable: boolean;
};

const QuoteFieldArrayContext = createContext<QuoteFieldArrayContextType>({
  addRow: () => ({}),
  removeRow: () => ({}),
  updateRow: () => ({}),
  rows: [],
  catalog: { isOpen: false, setIsOpen: () => {} },
  submitForm: () => ({}),
  isSubmitting: false,
  isEditable: true,
});

interface ExtendedQuoteContextProviderProps {
  control: Control<QuoteFormValues>;
  onSubmit: () => void;
  isSubmitting: boolean;
  isEditable: boolean;
}

const ExtendedQuoteContextProvider = ({
  children,
  control,
  onSubmit,
  isSubmitting,
  isEditable,
}: PropsWithChildren<ExtendedQuoteContextProviderProps>) => {
  const [catalog, setCatalog] = useState(false);

  const { append, remove, update, fields } = useFieldArray<QuoteFormValues>({
    name: "rows",
    control: control,
  });

  const addRow = (row: Omit<QuoteRow, "id"> & { id?: QuoteRow["id"] }) =>
    append({
      ...row,
      description: row?.description ?? "",
      order: fields.length + 1,
      quoteId: row?.quoteId ?? "",
    });

  return (
    <QuoteFieldArrayContext.Provider
      value={{
        isEditable,
        isSubmitting,
        rows: fields.map((field) => ({
          ...field,
          description: field?.description ?? "",
        })),
        addRow,
        removeRow: (index) => remove(index),
        updateRow: (index, row) =>
          update(index, {
            ...row,
            description: row?.description ?? "",
            quoteId: row?.quoteId ?? "",
          }),
        catalog: { isOpen: catalog, setIsOpen: setCatalog },
        submitForm: onSubmit,
      }}
    >
      {children}
    </QuoteFieldArrayContext.Provider>
  );
};

export const useExtendedQuoteContext = () => useContext(QuoteFieldArrayContext);
