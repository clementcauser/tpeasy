import { Role } from "@prisma/client";

export type FeatureName = "bills" | "quotes" | "clients" | "settings";
type AppFeature = { name: FeatureName; authorizedRoles: Role[] };

// WARNING -> THIS ARRAY MUST HAVE THE SAME ITEMS IN THE SAME ORDER THAN SEEDS ONE
export const FEATURES: AppFeature[] = [
  { name: "bills", authorizedRoles: [Role.EMPLOYEE, Role.OWNER] },
  { name: "quotes", authorizedRoles: [Role.EMPLOYEE, Role.OWNER] },
  { name: "clients", authorizedRoles: [Role.EMPLOYEE, Role.OWNER] },
  { name: "settings", authorizedRoles: [Role.OWNER] },
];
