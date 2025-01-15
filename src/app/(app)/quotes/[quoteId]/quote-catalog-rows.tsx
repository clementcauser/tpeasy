"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getMoneyPrice } from "@/lib/utils/index";
import { getQuoteTaxRateLabel } from "@/lib/utils/quotes";
import { CatalogRow } from "@prisma/client";
import { IconLoader } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
  rows: CatalogRow[];
  isLoading: boolean;
  onClose: () => void;
}

export default function QuoteCatalogRows({ rows, isLoading, onClose }: Props) {
  const [selectedRows, setSelectedRows] = useState<CatalogRow[]>([]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <IconLoader className="animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="mt-6">
        <ul className="flex flex-col gap-4">
          {rows.map((row) => (
            <li key={row.id}>
              <Row
                row={row}
                isSelected={selectedRows.some(({ id }) => row.id === id)}
                onSelect={(row) => {
                  setSelectedRows((prev) =>
                    prev.some(({ id }) => row.id === id)
                      ? prev.filter(({ id }) => row.id !== id)
                      : [...prev, row]
                  );
                }}
              />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end gap-2 items-center">
          <Button disabled={selectedRows.length === 0}>
            {selectedRows.length === 0
              ? "Ajouter"
              : selectedRows.length > 1
              ? `Ajouter ces ${selectedRows.length} éléments`
              : "Ajouter cet élément"}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
        </div>
      </div>
    );
  }
}

interface RowProps {
  row: CatalogRow;
  isSelected: boolean;
  onSelect: (row: CatalogRow) => void;
}

function Row({ row, onSelect, isSelected }: RowProps) {
  return (
    <div className="flex items-center gap-4 bg-slate-50 rounded-lg p-3">
      <Checkbox
        id={row.id}
        checked={isSelected}
        onCheckedChange={() => onSelect(row)}
      />
      <label htmlFor={row.id} className="w-full cursor-pointer">
        <p className="font-bold">{row.name}</p>
        <div className="grid grid-cols-2 gap-x-2">
          <p>Prix unitaire : {getMoneyPrice(row.unitPrice)}</p>
          <p>TVA : {getQuoteTaxRateLabel(row.taxRate)}</p>
          <p>Unité : {row.unit}</p>
        </div>
      </label>
    </div>
  );
}
