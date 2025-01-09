import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function getMoneyPrice(price: number | string, currency?: string) {
  const curr = currency ?? "EUR";

  if (typeof price === "string") {
    return `${price.replace(".", ",")} ${curr === "EUR" ? "€" : "$"}`;
  } else if (typeof price === "number") {
    return `${price.toFixed(2).replace(".", ",")} ${
      curr === "EUR" ? "€" : "$"
    }`;
  } else {
    throw Error("Wrong input price");
  }
}
