"use client";

import { QuoteFormValues } from "@/components/providers/quote-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QuoteTitleDialog({ isOpen, onOpenChange }: Props) {
  const { setValue } = useFormContext<QuoteFormValues>();
  const watchedTitle = useWatch({ name: "title" });

  const [title, setTitle] = useState(watchedTitle);

  useEffect(() => {
    if (isOpen) {
      setTitle(watchedTitle);
    }
  }, [watchedTitle, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modification du titre du devis</DialogTitle>
          <VisuallyHidden.Root>
            <DialogDescription>
              Modifiez le titre de votre devis pour le rendre plus pertinent.
            </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>

        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <DialogFooter className="flex items-center gap-2 justify-end">
          <Button
            type="button"
            onClick={() => {
              setValue("title", title);
              onOpenChange(false);
            }}
          >
            Changer le titre
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
