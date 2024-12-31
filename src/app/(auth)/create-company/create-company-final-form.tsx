"use client";

import { createCompanyAction } from "@/lib/actions/companies";
import { createCompanySchema } from "@/lib/validation/companies";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { IconLoader } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { Company } from "@prisma/client";

type LightCompany = Omit<Company, "createdAt" | "updatedAt" | "id">;
type FormValues = z.infer<typeof createCompanySchema>;

interface Props {
  company: LightCompany;
}

export default function CreateCompanyFinalForm({ company }: Props) {
  const { data } = useSession();
  const form = useForm<FormValues>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      ...company,
      userId: data?.user.id,
      mainPhone: "",
      secondaryPhone: "",
    },
  });

  const { executeAsync, isPending, hasErrored } =
    useAction(createCompanyAction);

  async function onSubmit(values: FormValues) {
    if (data?.user.id) {
      const result = await executeAsync({ ...values, userId: data.user.id });

      if (!hasErrored && result?.data) {
        // SHOW SUCCESS TOAST
        // REDIRECT TO /DASHBOARD
      }
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
          name="mainPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone principal *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="0612345678" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secondaryPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone secondaire</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="0123456789"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Finaliser la création{" "}
          {isPending && <IconLoader className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
