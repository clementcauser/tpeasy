import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { getCompanyClients } from "@/lib/db/clients";
import ClientListDeleteDialog from "./clients-list-delete-dialog";
import ClientsListEditSheet from "./clients-list-edit-sheet";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ClientsList() {
  const session = await auth();
  const clients = await getCompanyClients({
    companyId: session?.user.companyId ?? "",
  });

  return (
    <Table>
      <TableCaption>
        Plus votre répertoire clients est complet, plus vous pourrez créer des
        devis et factures rapidemment.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Téléphone(s)</TableHead>
          <TableHead>Adresse</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.mainPhone}</TableCell>
            <TableCell>{client.address}</TableCell>
            <TableCell className="w-24">
              <div className="flex items-center justify-end gap-2">
                <ClientsListEditSheet client={client} />
                <ClientListDeleteDialog clientId={client.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function ClientsListLoading() {
  return (
    <Table>
      <TableCaption>
        Plus votre répertoire clients est complet, plus vous pourrez créer des
        devis et factures rapidemment.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Téléphone(s)</TableHead>
          <TableHead>Adresse</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-6 w-44" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-40" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-36" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-72" />
            </TableCell>
            <TableCell className="w-24">
              <div className="flex items-center justify-end gap-2">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
