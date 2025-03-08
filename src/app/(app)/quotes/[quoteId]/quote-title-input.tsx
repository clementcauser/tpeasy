"use client";

import {
  QuoteFormValues,
  useExtendedQuoteContext,
} from "@/components/providers/quote-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function QuoteTitleInput() {
  const { setValue, getValues } = useFormContext<QuoteFormValues>();
  const { isEditable } = useExtendedQuoteContext();
  const watchedTitle = useWatch({ name: "title" });

  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState(getValues("title"));

  useEffect(() => {
    if (showInput) {
      setTitle(watchedTitle);
    }
  }, [watchedTitle, showInput]);

  return (
    <div className="flex gap-2 items-center group p-1">
      {!showInput ? (
        <>
          <h1 className="font-bold text-3xl">{watchedTitle}</h1>
          {isEditable && (
            <div>
              <Button
                onClick={() => setShowInput(true)}
                className="hidden group-hover:flex"
                size="icon"
                type="button"
              >
                <IconPencil />
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="min-w-60 md:min-w-80"
          />
          <div className="flex gap-1 items-center">
            <Button
              type="button"
              aria-description="Valider"
              onClick={() => {
                setValue("title", title);
                setShowInput(false);
              }}
              size="icon"
            >
              <IconCheck />
            </Button>
            <Button
              type="button"
              aria-description="Annuler"
              variant="secondary"
              size="icon"
              onClick={() => {
                setShowInput(false);
              }}
            >
              <IconX />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
