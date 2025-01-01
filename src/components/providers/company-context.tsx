"use client";

import { getCurrentCompanyAction } from "@/lib/actions/companies";
import { Company } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type CompanyContextType = {
  company: Company | null;
};

const CompanyContext = createContext<CompanyContextType>({ company: null });

export const CompanyProvider = ({ children }: PropsWithChildren) => {
  const [company, setCompany] = useState<Company | null>(null);
  const { data, status } = useSession();

  const { executeAsync } = useAction(getCurrentCompanyAction);

  useEffect(() => {
    const fetchCompany = async () => {
      if (data?.user?.companyId && data?.user.id) {
        const result = await executeAsync({
          companyId: data.user?.companyId,
          userId: data.user.id,
        });

        setCompany(result?.data ?? null);
      }
    };

    if (status === "authenticated") {
      fetchCompany();
    }
  }, [status, data, executeAsync]);

  return (
    <CompanyContext.Provider value={{ company }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCurrentCompany = () => useContext(CompanyContext);
