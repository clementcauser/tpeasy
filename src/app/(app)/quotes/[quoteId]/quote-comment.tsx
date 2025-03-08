"use client";

import {
  QuoteFormValues,
  useExtendedQuoteContext,
} from "@/components/providers/quote-context";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export default function QuoteComment() {
  const { control } = useFormContext<QuoteFormValues>();
  const { isEditable } = useExtendedQuoteContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <FormField
        control={control}
        name="paymentTerms"
        render={({ field }) => (
          <FormItem className="ml-1">
            <FormLabel>Modalités de paiement</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Indiquez les conditions de paiement..."
                className="resize-none disabled:border-transparent disabled:p-0 disabled:opacity-100 disabled:shadow-none"
                rows={4}
                {...field}
                value={field.value ?? ""}
                disabled={!isEditable}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="latePenalties"
        render={({ field }) => (
          <FormItem className="ml-1">
            <FormLabel>Pénalités de retard</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Indiquez les pénalités applicables..."
                className="resize-none disabled:border-transparent disabled:p-0 disabled:opacity-100 disabled:shadow-none"
                rows={4}
                {...field}
                value={field.value ?? ""}
                disabled={!isEditable}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="comment"
        render={({ field }) => (
          <FormItem className="lg:col-span-2 ml-1">
            <FormLabel>Notes ou conditions particulières</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Paiement, délais, garantie, etc."
                className="resize-none disabled:border-transparent disabled:p-0 disabled:opacity-100 disabled:shadow-none"
                rows={4}
                {...field}
                value={field.value ?? ""}
                disabled={!isEditable}
              />
            </FormControl>
            <FormDescription hidden={!isEditable}>
              Renseignez les conditions particulières liées au devis ou tout
              autre commentaire additionnel.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
