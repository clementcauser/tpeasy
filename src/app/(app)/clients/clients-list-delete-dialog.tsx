"use client";

import { useCurrentCompany } from "@/components/providers/company-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteClientAction } from "@/lib/actions/clients";
import { IconTrash } from "@tabler/icons-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

interface Props {
  clientId: string;
}

export default function ClientListDeleteDialog({ clientId }: Props) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { company } = useCurrentCompany();

  const { executeAsync, isPending } = useAction(deleteClientAction, {
    onSuccess: (deleted) => {
      toast({
        title: "Client supprimé",
        description: `${deleted?.data?.name} a été supprimé avec succès`,
      });

      setOpen(false);
    },
    onError: () =>
      toast({
        title: "Erreur",
        description: "Une erreur est survenue pendant la suppression du client",
      }),
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <IconTrash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Suppression du client</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer définitivement ce client. Est-ce
            réellement ce que vous souhaitez faire ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              disabled={isPending}
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
          </AlertDialogCancel>
          {company && (
            <AlertDialogAction asChild>
              <Button
                disabled={isPending}
                variant="destructive"
                onClick={async () =>
                  await executeAsync({ clientId, companyId: company.id })
                }
              >
                <IconTrash /> Confirmer
              </Button>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
