"use client";

import { CompanyProvider } from "@/components/providers/company-context";
import { SessionProvider } from "next-auth/react";
import { NavigationGuardProvider } from "next-navigation-guard";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <NavigationGuardProvider>
        <CompanyProvider>{children}</CompanyProvider>
      </NavigationGuardProvider>
    </SessionProvider>
  );
}
