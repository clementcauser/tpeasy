"use client";

import { getCurrentCompanyAction } from "@/lib/actions/companies";
import { FeatureName } from "@/lib/constants/features";
import { Company, CompanyFeature, Feature, Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type CompanyFeatureWithFeature = CompanyFeature & { feature: Feature };
type CompanyWithFeatures = Company & {
  companyFeatures?: CompanyFeatureWithFeature[];
};
type CompanyContextType = {
  company: CompanyWithFeatures | null;
  features: string[];
  checkHasFeature: (featureName: FeatureName) => boolean;
};

const getActiveFeatures = (
  companyFeatures: CompanyFeatureWithFeature[],
  userRole: Role
): string[] => {
  const active = companyFeatures.filter((feat) => feat.isActive);
  const isAuthorizedByRole = active.filter((feat) =>
    feat.authorizedRoles.includes(userRole)
  );

  return isAuthorizedByRole.map((feat) => feat.feature.name);
};

const CompanyContext = createContext<CompanyContextType>({
  company: null,
  features: [],
  checkHasFeature: () => false,
});

export const CompanyProvider = ({ children }: PropsWithChildren) => {
  const [company, setCompany] = useState<CompanyWithFeatures | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const { data, status } = useSession();

  const { executeAsync } = useAction(getCurrentCompanyAction);

  useEffect(() => {
    const fetchCompanyWithFeatures = async () => {
      if (data?.user?.companyId && data?.user.id) {
        const result = await executeAsync({
          companyId: data.user?.companyId,
          userId: data.user.id,
        });

        if (result?.data) {
          setCompany(result.data);
          setFeatures(
            getActiveFeatures(result.data.companyFeatures, data.user.role)
          );
        } else {
          setCompany(null);
        }
      }
    };

    if (status === "authenticated") {
      fetchCompanyWithFeatures();
    }
  }, [status, data, executeAsync]);

  return (
    <CompanyContext.Provider
      value={{
        company,
        features,
        checkHasFeature: (featureName) => features.includes(featureName),
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCurrentCompany = () => useContext(CompanyContext);
