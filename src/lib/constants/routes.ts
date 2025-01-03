export type AppRoute =
  | "root"
  | "signin"
  | "dashboard"
  | "create-company"
  | "bills"
  | "settings"
  | "quotes"
  | "clients"
  | "createBills"
  | "createQuotes";

const ROUTES: Record<AppRoute, string> = {
  root: "/",
  "create-company": "/create-company",
  dashboard: "/dashboard",
  signin: "/signin",
  bills: "/bills",
  createBills: "/bills/create",
  settings: "/settings",
  quotes: "/quotes",
  createQuotes: "/quotes/create",
  clients: "/clients",
};

export const PUBLIC_ROUTES = [ROUTES.root, ROUTES.signin];

export default ROUTES;
