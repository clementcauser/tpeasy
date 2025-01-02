import { useCurrentCompany } from "@/components/providers/company-context";

export const useFeature = () => {
  const { checkHasFeature, features } = useCurrentCompany();

  return { features, hasFeature: checkHasFeature };
};
