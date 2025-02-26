"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/lib/utils/index";
import { signIn } from "next-auth/react";

interface Props {
  provider: "google";
  className?: string;
}

export default function SignInButton({ provider, className }: Props) {
  return (
    <Button
      variant="outline"
      onClick={() => signIn(provider)}
      className={cn(className)}
    >
      Se connecter avec {capitalizeFirstLetter(provider)}
    </Button>
  );
}
