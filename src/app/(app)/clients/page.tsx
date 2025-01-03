import { Suspense } from "react";
import ClientsList, { ClientsListLoading } from "./clients-list";

export default function Page() {
  return (
    <div className="mt-8">
      <Suspense fallback={<ClientsListLoading />}>
        <ClientsList />
      </Suspense>
    </div>
  );
}
