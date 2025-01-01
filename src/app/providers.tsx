"use client";

import { CompanyProvider } from "@/components/providers/company-context";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <CompanyProvider>{children}</CompanyProvider>
    </SessionProvider>
  );
}
