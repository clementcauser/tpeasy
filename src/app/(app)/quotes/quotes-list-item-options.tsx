"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconEye,
  IconLoader,
  IconStatusChange,
  IconTrash,
} from "@tabler/icons-react";
import { createElement, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import {
  changeQuoteStatusAction,
  deleteQuoteAction,
} from "@/lib/actions/quotes";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";
import { Quote, QuoteStatus } from "@prisma/client";
import ROUTES from "@/lib/constants/routes";
import Link from "next/link";
import {
  getQuoteStatusData,
  getRemainingQuoteStatuses,
} from "@/lib/utils/quotes";

interface QuoteActionsProps {
  quote: Quote;
}

export default function QuoteActions({ quote }: QuoteActionsProps) {
  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Ouvrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <IconEye size="24" />
            <Link href={ROUTES.quoteDetails.replace("[quoteId]", quote.id)}>
              Voir détails
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ChangeStatusQuoteDialog quote={quote} />
          </DropdownMenuItem>
          {quote.status === QuoteStatus.DRAFT && (
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteQuoteDialog quoteId={quote.id} />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function DeleteQuoteDialog({ quoteId }: { quoteId: Quote["id"] }) {
  const { toast } = useToast();
  const { execute, isPending } = useAction(deleteQuoteAction, {
    onError: () =>
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue pendant la suppression de ce devis.",
        variant: "destructive",
      }),
    onSuccess: () =>
      toast({
        title: "Succès",
        description: "Le devis a bien été supprimé ! 🗑️",
      }),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-2 cursor-pointer">
          <IconTrash size={16} /> Supprimer
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Êtes-vous vraiment sûr.e de vouloir supprimer ce devis ?
          </DialogTitle>
          <DialogDescription>
            Cette action est irréversible et entraînera la suppression
            définitive de ce devis.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isPending} variant="outline">
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={isPending}
              variant="destructive"
              onClick={() => execute({ id: quoteId })}
            >
              {isPending ? (
                <IconLoader className="animate-spin" />
              ) : (
                "Supprimer"
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ChangeStatusQuoteDialog({ quote }: { quote: Quote }) {
  const [selectedStatus, setSelectedStatus] = useState<QuoteStatus>(
    quote.status
  );

  const { toast } = useToast();
  const { execute, isPending } = useAction(changeQuoteStatusAction, {
    onError: () =>
      toast({
        title: "Erreur",
        description: "Impossible de changer le statut de ce devis",
        variant: "destructive",
      }),
    onSuccess: () =>
      toast({
        title: "Succès",
        description: "Le statut de ce devis a bien été modifié ✅",
      }),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-2 cursor-pointer">
          <IconStatusChange size={16} /> Changer le statut
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Changement de status du devis : {quote.title}
          </DialogTitle>
          <DialogDescription>
            <span className="block">
              Vous pouvez à tout moment changer le statut d&apos;un devis si
              nécessaire. Cela vous permettra d&apos;organiser vos devis avec
              une précision supplémentaire.
            </span>
            <span className="block">
              <span className="font-bold">Attention</span>, il n&apos;est plus
              possible de modifier le statut d&apos;un devis si il est
              actuellement :<span className="font-bold">Refusé</span>,{" "}
              <span className="font-bold">Expiré</span> ou{" "}
              <span className="font-bold">Accepté</span>.
            </span>
          </DialogDescription>
        </DialogHeader>

        <Select
          onValueChange={(selected) =>
            setSelectedStatus(selected as QuoteStatus)
          }
          defaultValue={selectedStatus}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut du devis..." />
          </SelectTrigger>
          <SelectContent>
            {getRemainingQuoteStatuses(quote.status).map((status) => {
              const { icon, label } = getQuoteStatusData(
                status satisfies QuoteStatus
              );

              return (
                <SelectItem key={status} value={status}>
                  <span className="flex items-center gap-2">
                    {createElement(icon, { size: 16 })} {label}
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isPending} variant="outline">
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => execute({ id: quote.id, status: selectedStatus })}
              disabled={isPending}
            >
              {isPending ? (
                <IconLoader className="animate-spin" />
              ) : (
                "Enregistrer"
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
