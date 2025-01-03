import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCompanyClientsCountAction } from "@/lib/actions/clients";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface Props {
  companyId: string;
}

export default async function ClientsCountCard({ companyId }: Props) {
  const response = await getCompanyClientsCountAction({ companyId });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          Nombre de clients enregistrés
        </CardTitle>
        <VisuallyHidden.Root>
          <CardDescription>
            Il s&apos;agit du nombre total de clients enregistrés dans votre
            répertoire
          </CardDescription>
        </VisuallyHidden.Root>
        <CardContent className="p-2">
          <p
            className="text-3xl font-extrabold text-center"
            aria-label={`${response?.data} clients`}
          >
            {response?.data}
          </p>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export function ClientsCountCardLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col items-center gap-1">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-1/2 h-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center p-2">
        <Skeleton className="h-9 w-11" />
      </CardContent>
    </Card>
  );
}
