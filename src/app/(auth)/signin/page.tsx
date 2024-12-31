import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInButton from "./sign-in-button";

export default async function Page() {
  return (
    <main className="px-6">
      <Card className="w-full max-w-lg m-auto">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre espace entreprise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton provider="google" />
        </CardContent>
      </Card>
    </main>
  );
}
