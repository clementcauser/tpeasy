import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigationGuard } from "next-navigation-guard";

type LeavingDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
  enabled: boolean;
};

export const LeavingDialog = ({
  onConfirm,
  onCancel,
  enabled,
}: LeavingDialogProps) => {
  const navGuard = useNavigationGuard({ enabled });

  return (
    <AlertDialog open={navGuard.active}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Vos données ne sont pas sauvegardées
          </AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous vraiment sûr.e de vouloir quitter cette page ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              navGuard.reject();
              onCancel();
            }}
          >
            Non
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              navGuard.accept();
              onConfirm();
            }}
          >
            Oui, sauvegarder mes données
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
