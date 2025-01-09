"use client";

import { useCurrentCompany } from "@/components/providers/company-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { createClientAction, udpateClientAction } from "@/lib/actions/clients";
import {
  createClientSchema,
  updateClientSchema,
} from "@/lib/validation/clients";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@prisma/client";
import { IconLoader } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = z.infer<typeof createClientSchema>;
type LightFormValues = Omit<FormValues, "companyId" | "createdById">;

const DEFAULT_VALUES: LightFormValues = {
  address: "",
  email: "",
  mainPhone: "",
  name: "",
  secondaryPhone: "",
};

interface Props {
  defaultValues?: LightFormValues;
  clientId?: string;
  onSubmitSuccess?: (client?: Client) => void;
  fromQuoteCreationForm?: boolean;
}

export default function CreateClientForm({
  defaultValues = DEFAULT_VALUES,
  clientId,
  onSubmitSuccess,
  fromQuoteCreationForm = false,
}: Props) {
  const { toast } = useToast();
  const { company } = useCurrentCompany();
  const { data } = useSession();
  const form = useForm<FormValues>({
    shouldUseNativeValidation: false,
    resolver: zodResolver(clientId ? updateClientSchema : createClientSchema),
    defaultValues: {
      ...defaultValues,
      companyId: company?.id,
      createdById: data?.user.id,
      ...(clientId ? { id: clientId } : {}),
    },
  });

  const { execute, isPending } = useAction(
    clientId ? udpateClientAction : createClientAction,
    {
      onSuccess: (data) => {
        toast({
          title: "C'est fait ✅",
          description: clientId
            ? "Le client a correctement été mis à jour"
            : "Le client a été créé avec succès !",
        });
        if (clientId || fromQuoteCreationForm) {
          onSubmitSuccess?.(data?.data);
        } else {
          form.reset();
        }
      },
      onError: () =>
        toast({
          title: "Erreur",
          description: clientId
            ? "Une erreur s'est produite pendant la mise à jour de ce client. Veuillez réessayer ou contacter le support."
            : "Une erreur s'est produite pendant la création de ce client. Veuillez réessayer ou contacter le support.",
          variant: "destructive",
        }),
    }
  );

  const onSubmit = (formValues: FormValues) => execute(formValues);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom ou raison sociale *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Jean Dupont, SNCF, ..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse email *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="jean.dupont@mail.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse postale *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="12 rue de la mairie, 75000, Paris"
                />
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
                <Input {...field} type="tel" placeholder="0612345678" />
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
                  type="tel"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {clientId ? "Modifier le client" : "Créer le client"}{" "}
          {isPending && <IconLoader className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
