import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CompanyLegalForm from "./company-legal-form";
import CompanyGeneralForm from "./company-general-form";

export default function SettingsCompanyTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
          <CardDescription>
            Ce sont les informations non techniques liées à votre entreprise.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyGeneralForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Informations légales</CardTitle>
          <CardDescription>
            Certaines de ces informations ne sont pas éditables. Pour ce faire,
            contactez l&apos;équipe support pour en faire la demande.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyLegalForm />
        </CardContent>
      </Card>
    </div>
  );
}
