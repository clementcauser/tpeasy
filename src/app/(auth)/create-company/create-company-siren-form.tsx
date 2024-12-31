"use client";

import { createCompanyFromSIRENAction } from "@/lib/actions/companies";
import { createCompanyFromSIRENSchema } from "@/lib/validation/companies";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { IconLoader, IconSearch } from "@tabler/icons-react";
import { useCreateCompany } from "./create-company-context";

type FormValues = z.infer<typeof createCompanyFromSIRENSchema>;

export default function CreateCompanySIRENForm() {
  const { setCompany } = useCreateCompany();
  const form = useForm<FormValues>({
    resolver: zodResolver(createCompanyFromSIRENSchema),
    defaultValues: { SIREN: "" },
  });

  const { executeAsync, isPending, hasErrored } = useAction(
    createCompanyFromSIRENAction
  );

  async function onSubmit(values: FormValues) {
    const result = await executeAsync(values);

    if (!hasErrored && result?.data) {
      setCompany(result.data);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="SIREN"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro SIREN</FormLabel>
              <FormControl>
                <Input {...field} placeholder="123456789" />
              </FormControl>
              <FormDescription>
                Nous allons retrouver votre entreprise grâce à son SIREN
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          <IconSearch /> Chercher mon entreprise{" "}
          {isPending && <IconLoader className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
