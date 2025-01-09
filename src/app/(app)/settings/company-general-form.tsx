"use client";

import { useCurrentCompany } from "@/components/providers/company-context";
import { Button } from "@/components/ui/button";
import {
  Form as UIForm,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { updateCompanyGeneralInfosAction } from "@/lib/actions/companies";
import { updateCompanyGeneralInfosSchema } from "@/lib/validation/companies";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import { IconLoader } from "@tabler/icons-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = z.infer<typeof updateCompanyGeneralInfosSchema>;

const mapCompanyWithFeaturesIntoFormValues = (company: Company): FormValues => {
  const { address, commercialName, id, mainPhone, email } = company;

  return {
    address,
    email,
    commercialName,
    mainPhone,
    companyId: id,
    companyPrefix: company?.companyPrefix ?? "",
    secondaryPhone: company?.secondaryPhone ?? "",
  };
};

export default function CompanyGeneralForm() {
  const { company } = useCurrentCompany();

  if (company) {
    return <Form />;
  } else {
    return (
      <div className="flex justify-center items-center h-[546px]">
        <IconLoader className="animate-spin" />
      </div>
    );
  }
}

function Form() {
  const { toast } = useToast();
  const { company } = useCurrentCompany();
  const form = useForm<FormValues>({
    resolver: zodResolver(updateCompanyGeneralInfosSchema),
    defaultValues: {
      ...(company ? mapCompanyWithFeaturesIntoFormValues(company) : {}),
    },
  });

  useEffect(() => {
    if (company) {
      form.reset(mapCompanyWithFeaturesIntoFormValues(company));
    }
  }, [company, form]);

  const { execute, isPending } = useAction(updateCompanyGeneralInfosAction, {
    onSuccess: () => {
      toast({
        title: "Mise à jour ✅",
        description: "Entreprise mise à jour avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description:
          "Une erreur s'est produite pendant la mise à jour de votre entreprise. Si le problème persiste veuillez contacter l'équipe support.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: FormValues) => execute(values);

  return (
    <UIForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          name="commercialName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom commercial</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Nom qui sera affiché sur vos devis et factures
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="companyPrefix"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Préfixe</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Ce préfixe sera utilisé pour généré vos numéros de facture et de
                devis.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse postale</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mainPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone principal *</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4" type="submit" disabled={isPending}>
          Mettre à jour les informations générales
          {isPending && <IconLoader className="animate-spin" />}
        </Button>
      </form>
    </UIForm>
  );
}
