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
import { useRouter } from "next/navigation";
import ROUTES from "@/lib/constants/routes";
import { useToast } from "@/hooks/use-toast";

type LightCompany = Omit<
  Company,
  "createdAt" | "updatedAt" | "id" | "companyPrefix"
>;
type FormValues = z.infer<typeof createCompanySchema>;

interface Props {
  company: LightCompany;
  onPreviousClick: () => void;
}

export default function CreateCompanyFinalForm({
  company,
  onPreviousClick,
}: Props) {
  const { toast } = useToast();
  const { push } = useRouter();
  const { data, update } = useSession();
  const form = useForm<FormValues>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      ...company,
      userId: data?.user.id,
      mainPhone: "",
      secondaryPhone: "",
    },
  });

  const { execute, isPending } = useAction(createCompanyAction, {
    onSuccess: async (result) => {
      const companyId = result?.data?.id;

      await update({ companyId });

      toast({
        title: "Félicitations !",
        description: "Votre entreprise a été créée avec succès !",
      });
      push(ROUTES.dashboard);
    },
    onError: () =>
      toast({
        title: "Erreur",
        description:
          "Une erreur s'est produite pendant la création de votre entreprise. Veuillez réessayer ou contacter le support.",
        variant: "destructive",
      }),
  });

  async function onSubmit(values: FormValues) {
    return execute({ ...values, userId: data?.user.id ?? "" });
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
        <div className="flex gap-2 justify-end items-center">
          <Button type="submit" disabled={isPending}>
            Finaliser la création{" "}
            {isPending && <IconLoader className="animate-spin" />}
          </Button>
          <Button onClick={onPreviousClick}>Retour</Button>
        </div>
      </form>
    </Form>
  );
}
