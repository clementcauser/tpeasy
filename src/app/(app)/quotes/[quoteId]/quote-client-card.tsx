import { Client } from "@prisma/client";
import { QuoteClientSheetWithButton } from "./quote-client-sheet";

interface Props {
  client: Client;
  quoteId: string;
}

export default function QuoteClientCard({ client, quoteId }: Props) {
  return (
    <div>
      <h4 className="font-bold">Informations client</h4>
      <div className="px-4 py-3 rounded border bg-slate-50 hover:shadow-sm transition-shadow">
        <div className="flex justify-between items-center">
          <p className="font-bold">{client.name}</p>
          <QuoteClientSheetWithButton
            selectedClientId={client.id}
            companyId={client.companyId}
            quoteId={quoteId}
          />
        </div>
        <p>{client.address}</p>
        <p>{client.email}</p>
        <p>
          <span className="text-muted-foreground">Téléphone principal :</span>{" "}
          {client.mainPhone}
        </p>
        {client?.secondaryPhone && (
          <p>
            <span className="text-muted-foreground">
              Téléphone secondaire :
            </span>{" "}
            {client.secondaryPhone}
          </p>
        )}
      </div>
    </div>
  );
}
