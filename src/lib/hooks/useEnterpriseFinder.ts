import { useState } from "react";

type INSEEResponse = {
  header: {
    statut: "OK";
  };
  records: [
    {
      SIREN: string;
      "Nom de l'entreprise": string;
      Adresse: string;
      "Code NAF": string;
      "Date de création": string;
    }
  ];
};

const URL = "https://api.insee.fr/entreprises/sirene/V3/siren/";
const API_KEY = process.env.NEXT_PUBLIC_INSEE_API_KEY;

const useEnterpriseFinder = () => {
  const [enterprise, setEnterprise] = useState<INSEEResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEnterpriseBySIREN = async (siren: string) => {
    try {
      setLoading(true);
      const response = await fetch(URL + siren, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = (await response.json()) as INSEEResponse;

      setEnterprise(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      setEnterprise(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    enterprise,
    loading,
    fetchEnterpriseBySIREN,
  };
};

export default useEnterpriseFinder;
