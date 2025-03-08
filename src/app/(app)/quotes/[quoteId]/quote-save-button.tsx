"use client";

import { useExtendedQuoteContext } from "@/components/providers/quote-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconDeviceFloppy, IconLoader } from "@tabler/icons-react";

interface Props {
  className?: string;
}

export default function QuoteSaveButton({ className }: Props) {
  const { isSubmitting, isEditable } = useExtendedQuoteContext();

  if (isEditable) {
    return (
      <Button disabled={isSubmitting} className={cn(className)} type="submit">
        <IconDeviceFloppy /> Sauvegarder{" "}
        {isSubmitting && <IconLoader className="animate-spin" />}
      </Button>
    );
  } else {
    return null;
  }
}
