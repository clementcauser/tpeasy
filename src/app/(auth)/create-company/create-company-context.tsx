"use client";

import { Company } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

type LightCompany = Omit<
  Company,
  "id" | "createdAt" | "updatedAt" | "companyPrefix"
>;

interface CreateCompanyContextType {
  company: LightCompany | null;
  setCompany: (company: LightCompany | null) => void;
  validateInformations: () => void;
  goPreviousStep: () => void;
}

const CreateCompanyContext = createContext<CreateCompanyContextType>({
  company: null,
  setCompany: () => ({}),
  validateInformations: () => ({}),
  goPreviousStep: () => ({}),
});

interface Props {
  children: (step: number) => ReactNode;
}

export default function CreateCompanyProvider({ children }: Props) {
  const [company, setCompany] = useState<LightCompany | null>(null);
  const [step, setStep] = useState(0);

  const goNextStep = () => setStep((prev) => prev + 1);

  return (
    <CreateCompanyContext.Provider
      value={{
        company,
        setCompany: (company) => {
          setCompany(company);
          goNextStep();
        },
        validateInformations: goNextStep,
        goPreviousStep: () => setStep((prev) => (prev > 0 ? prev - 1 : 0)),
      }}
    >
      {children(step)}
    </CreateCompanyContext.Provider>
  );
}

export const useCreateCompany = () => useContext(CreateCompanyContext);
