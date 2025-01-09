import { Client } from "@prisma/client";

interface Props {
  client: Client;
}

export default function QuoteClientCard({ client }: Props) {
  return (
    <div>
      <h4 className="font-bold">Informations client</h4>
      <div className="px-4 py-3 rounded border">
        <p>{client.name}</p>
        <p>{client.address}</p>
        <p>{client.email}</p>
        <p>Téléphone principal : {client.mainPhone}</p>
        {client?.secondaryPhone && (
          <p>Téléphone secondaire : {client.secondaryPhone}</p>
        )}
      </div>
    </div>
  );
}
