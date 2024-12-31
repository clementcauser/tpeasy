"use client";

import { Button } from "@/components/ui/button";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useCreateCompany } from "./create-company-context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Company } from "@prisma/client";

type LightCompany = Omit<
  Company,
  "id" | "mainPhone" | "secondaryPhone" | "createdAt" | "updatedAt"
>;

const buildTable = (company: LightCompany) => {
  const DICTIONNARY: Record<keyof LightCompany, string> = {
    activityCode: "Code activité",
    address: "Adresse",
    capital: "Capital",
    category: "Catégorie",
    commercialName: "Nom commercial",
    currency: "Devise",
    siren: "SIREN",
    siret: "SIRET",
  };

  const array = Object.keys(company);

  return array.map((key) => (
    <TableRow key={key}>
      <TableCell>
        <p>{DICTIONNARY[key as keyof LightCompany]}</p>
      </TableCell>
      <TableCell>
        <p>{company[key as keyof LightCompany]}</p>
      </TableCell>
    </TableRow>
  ));
};

function CreateCompanyStepTwo() {
  const { company, validateInformations, goPreviousStep } = useCreateCompany();

  return (
    <>
      <div className="mb-4">
        <p>Veuillez vérifier la conformité des informations ci-dessous.</p>
        {company && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>{buildTable(company)}</TableBody>
          </Table>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={validateInformations}>
          <IconCheck />
          Oui, ces informations sont correctes
        </Button>
        <Button variant="destructive" onClick={goPreviousStep}>
          <IconX />
          Non, je souhaite revenir en arrière
        </Button>
      </div>
    </>
  );
}

export default CreateCompanyStepTwo;
