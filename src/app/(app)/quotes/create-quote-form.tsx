import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getCompanyClientsAction } from "@/lib/actions/clients";
import { createQuoteAction } from "@/lib/actions/quotes";
import { cn } from "@/lib/utils";
import { buildDefaultQuotePrefix } from "@/lib/utils/quotes";
import { createQuoteSchema } from "@/lib/validation/quotes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company, Quote } from "@prisma/client";
import { IconLoader } from "@tabler/icons-react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CreateClientForm from "../clients/create-client-form";
import { Input } from "@/components/ui/input";

type FormValues = z.infer<typeof createQuoteSchema>;

interface Props {
  company: Company;
  userId: string;
  onSubmitSuccess: (quote?: Quote) => void;
  quote?: Quote;
}

function CreateQuoteForm({ company, userId, onSubmitSuccess, quote }: Props) {
  const [showClientForm, setShowClientForm] = useState(false);
  const { toast } = useToast();

  const DEFAULT_VALUES: FormValues = quote
    ? {
        ...quote,
        companyId: quote.companyId ?? company.id,
        comment: quote.comment ?? "",
      }
    : {
        title: "",
        expirationDate: new Date(Date.now()),
        clientId: "",
        referenceId: buildDefaultQuotePrefix(
          company.companyPrefix ?? company.commercialName.substring(0, 3),
          new Date(Date.now())
        ),
        comment: "",
        companyId: company.id,
        createdById: userId,
      };

  const form = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(createQuoteSchema),
  });

  const {
    execute: fetchClients,
    result,
    isPending: fetchingClients,
  } = useAction(getCompanyClientsAction);

  const { execute, isPending } = useAction(createQuoteAction, {
    onSuccess: ({ data }) => onSubmitSuccess(data),
    onError: () => {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue pendant la création de ce devis. Si le problème persiste, veuillez contacter l'équipe support.",
      });
    },
  });

  useEffect(
    () => fetchClients({ companyId: company.id }),
    [company.id, fetchClients]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(execute)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objet</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Création site web, rénovation salle de bain, ..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border rounded-xl px-4 py-2">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Client</FormLabel>
                <Select
                  disabled={fetchingClients}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {result?.data?.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-center mt-1">ou</p>
          <Dialog open={showClientForm} onOpenChange={setShowClientForm}>
            <div className="flex justify-center">
              <DialogTrigger asChild>
                <Button variant="link">Créer un client</Button>
              </DialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Création d&apos;un client</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <CreateClientForm
                fromQuoteCreationForm
                onSubmitSuccess={() => {
                  fetchClients({ companyId: company.id });
                  setShowClientForm(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de fin de validité</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>Choisissez une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date(Date.now())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Il s&apos;agit de la date de fin de validité du devis
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes ou conditions particulières</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Paiement, délais, garantie, etc."
                  className="resize-none"
                  {...field}
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

        <SheetFooter>
          <Button className="mt-4" disabled={isPending} type="submit">
            Créer un devis
            {isPending && <IconLoader className="animate-spin" />}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}

export default CreateQuoteForm;
