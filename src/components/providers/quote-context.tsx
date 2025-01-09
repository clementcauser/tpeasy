"use client";

import { quoteFormSchema } from "@/lib/validation/quotes";
import { Quote, QuoteRow } from "@prisma/client";
import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
      <LeavingDialog
        enabled={form.formState.isDirty}
        onCancel={() => console.log(form.getValues())}
        onConfirm={() => console.log("YES")}
      />
    </FormProvider>
  );
}
