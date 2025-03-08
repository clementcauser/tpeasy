"use client";

import {
  QuoteFormValues,
  useExtendedQuoteContext,
} from "@/components/providers/quote-context";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconInfoCircle } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";

export default function QuoteTaxToggle() {
  const { isEditable } = useExtendedQuoteContext();
  const { control } = useFormContext<QuoteFormValues>();

  return (
    <FormField
      control={control}
      name="isTaxFree"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormControl>
              <Switch
                id="tax-toggle"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={!isEditable}
              />
            </FormControl>
            <div className="flex items-center space-x-1">
              <Label htmlFor="tax-toggle">TVA non applicable</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <IconInfoCircle />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Si cette option est activée, la mention &quot;TVA non
                      applicable, article 293 B du CGI&quot; apparaîtra sur le
                      votre devis
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}
