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
