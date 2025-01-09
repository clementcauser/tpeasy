"use client";

import { QuoteFormValues } from "@/components/providers/quote-context";
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

  return (
    <div>
      <FormField
        control={control}
        name="comment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes ou conditions particulières</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Paiement, délais, garantie, etc."
                className="resize-none"
                rows={4}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormDescription>
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
