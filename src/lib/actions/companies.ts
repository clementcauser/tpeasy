"use server";

import { Company, Role } from "@prisma/client";
import { actionClient } from "../utils/actions";
import {
  createCompanyFromSIRENSchema,
  createCompanySchema,
  getCurrentCompanySchema,
} from "../validation/companies";
import { createCompany, getCurrentCompany } from "../db/companies";
import { changeUserRole } from "../db/users";

interface InfoLegales {
  versioncourante: string;
  liendocversioncourante: string;
  derniereversion: string;
  liendocderniereversion: string;
  siren: string;
  sirenformat: string;
  urlfiche: string;
  siretsiege: string;
  siretsiegeformat: string;
  nicsiege: string;
  numtva: string;
  dernieremaj: string;
  datecreainsee: string;
  dateferminsee: string;
  denoinsee: string;
  nomcommercialinsee: string;
  enseigneinsee: string;
  sigleinsee: string;
  codecatjurlev1insee: string;
  codecatjurlev2insee: string;
  codecatjurlev3insee: string;
  catjurlibinsee: string;
  catcodeinsee: string;
  catlibinsee: string;
  nomadressageinsee: string;
  cpltnomadressageinsee: string;
  cpltadressageinsee: string;
  numvoieinsee: string;
  indrepinsee: string;
  typvoieinsee: string;
  libvoieinsee: string;
  voieadressageinsee: string;
  dispadressageinsee: string;
  codepostalinsee: string;
  codecommuneinsee: string;
  villeinsee: string;
  paysinsee: string;
  trancheeffinsee: string;
  aprminsee: string;
  nafcodelev1insee: string;
  nafcodelev2insee: string;
  nafcodelev3insee: string;
  nafcodelev4insee: string;
  nafinsee: string;
  naflibinsee: string;
  numrna: string;
  idcc: string;
  libidcc: string;
  datecrearcs: string;
  datefermrcs: string;
  rcs: string;
  codegreffe: string;
  numdossiergreffe: string;
  nomgreffe: string;
  denorcs: string;
  nomcommercialrcs: string;
  enseignercs: string;
  siglercs: string;
  typecap: string;
  capital: string;
  codedevise: string;
  libdevise: string;
  codecatjurlev1rcs: string;
  codecatjurlev2rcs: string;
  codecatjurlev3rcs: string;
  catjurlibrcs: string;
  nomadressagercs: string;
  cpltnomadressagercs: string;
  cpltadressagercs: string;
  voieadressagercs: string;
  dispadressagercs: string;
  codepostalrcs: string;
  villercs: string;
  paysrcs: string;
  nafcodelev1rcs: string;
  nafcodelev2rcs: string;
  nafcodelev3rcs: string;
  nafcodelev4rcs: string;
  nafrcs: string;
  naflibrcs: string;
  effmoyrcs: number;
}

interface ApiResponse {
  infolegales: InfoLegales;
}

const mapResponseIntoCompany = (
  response: ApiResponse
): Omit<Company, "id" | "createdAt" | "updatedAt"> => {
  return {
    address: `${response?.infolegales?.voieadressagercs}, ${response?.infolegales?.codepostalrcs} ${response?.infolegales?.villercs}, ${response?.infolegales?.paysrcs}`,
    mainPhone: "",
    secondaryPhone: "",
    commercialName:
      response?.infolegales?.denoinsee ??
      response?.infolegales?.nomcommercialinsee,
    siren: response?.infolegales?.siren,
    siret: response?.infolegales?.siretsiege,
    category: response?.infolegales?.naflibrcs,
    activityCode: response?.infolegales?.nafrcs,
    currency: response?.infolegales?.libdevise,
    capital: response?.infolegales?.capital,
    legalForm: response?.infolegales?.catjurlibrcs,
    taxId: response?.infolegales?.numtva,
    rcs: response?.infolegales?.rcs,
  };
};

export const createCompanyFromSIRENAction = actionClient
  .schema(createCompanyFromSIRENSchema)
  .action(async ({ parsedInput }) => {
    try {
      const TOKEN = process.env.NEXT_PUBLIC_SOCIETE_COM_API_KEY;
      const URL = `https://api.societe.com/api/v1/entreprise/${parsedInput.SIREN}/infoslegales?token=${TOKEN}`;

      const result = await fetch(URL, { method: "GET" });
      const json = (await result.json()) as ApiResponse;

      return mapResponseIntoCompany(json);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);

      throw Error(error as string);
    }
  });

export const createCompanyAction = actionClient
  .schema(createCompanySchema)
  .action(async ({ parsedInput }) => {
    try {
      const res = await createCompany(parsedInput);

      await changeUserRole({
        userId: parsedInput.userId,
        newRole: Role.OWNER,
      });

      return res;
    } catch (error) {
      console.error(error);
    }
  });

export const getCurrentCompanyAction = actionClient
  .schema(getCurrentCompanySchema)
  .action(async ({ parsedInput }) => {
    try {
      const company = await getCurrentCompany(parsedInput);

      return company;
    } catch (err) {
      console.error(err);

      throw Error(err as string);
    }
  });
