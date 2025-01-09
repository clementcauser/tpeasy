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
  | "quoteDetails";

const ROUTES: Record<AppRoute, string> = {
  root: "/",
  "create-company": "/create-company",
  dashboard: "/dashboard",
  signin: "/signin",
  bills: "/bills",
  createBills: "/bills/create",
  settings: "/settings",
  quotes: "/quotes",
  clients: "/clients",
  quoteDetails: "/quotes/[quoteId]",
};

export const PUBLIC_ROUTES = [ROUTES.root, ROUTES.signin];

export default ROUTES;
