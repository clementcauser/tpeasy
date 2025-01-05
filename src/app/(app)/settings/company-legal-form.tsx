"use client";

import { useCurrentCompany } from "@/components/providers/company-context";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as UIForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { updateCompanyLegalInfosAction } from "@/lib/actions/companies";
import { updateCompanyLegalInfosSchema } from "@/lib/validation/companies";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import { IconLoader } from "@tabler/icons-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = z.infer<typeof updateCompanyLegalInfosSchema>;

const mapCompanyWithFeaturesIntoFormValues = (company: Company): FormValues => {
  const { activityCode, capital, category, id, currency, legalForm, taxId } =
    company;

  return {
    activityCode,
    capital,
    category,
    companyId: id,
    currency,
    legalForm,
    taxId,
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
    resolver: zodResolver(updateCompanyLegalInfosSchema),
    defaultValues: {
      ...(company ? mapCompanyWithFeaturesIntoFormValues(company) : {}),
    },
  });

  useEffect(() => {
    if (company) {
      form.reset(mapCompanyWithFeaturesIntoFormValues(company));
    }
  }, [company, form]);

  const { execute, isPending } = useAction(updateCompanyLegalInfosAction, {
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
        <FormItem>
          <FormLabel>SIREN</FormLabel>
          <Input disabled value={company?.siren ?? ""} />
        </FormItem>

        <FormItem>
          <FormLabel>SIRET</FormLabel>
          <Input disabled value={company?.siret ?? ""} />
        </FormItem>

        <FormItem>
          <FormLabel>Numéro RCS</FormLabel>
          <Input disabled value={company?.rcs ?? ""} />
        </FormItem>

        <FormField
          name="legalForm"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forme juridique</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de TVA intracommunautaire</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activityCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code APE</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capital"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capital de l&apos;entreprise</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Devise</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4" type="submit" disabled={isPending}>
          Mettre à jour les informations légales
          {isPending && <IconLoader className="animate-spin" />}
        </Button>
      </form>
    </UIForm>
  );
}
