type Route =
  | "root"
  | "signin"
  | "dashboard"
  | "create-company"
  | "bills"
  | "settings";

const ROUTES: Record<Route, string> = {
  root: "/",
  "create-company": "/create-company",
  dashboard: "/dashboard",
  signin: "/signin",
  bills: "/bills",
  settings: "/settings",
};

export const PUBLIC_ROUTES = [ROUTES.root, ROUTES.signin];

export default ROUTES;
