type Route = "root" | "signin" | "dashboard" | "new-enterprise";

const ROUTES: Record<Route, string> = {
  root: "/",
  "new-enterprise": "/new-enterprise",
  dashboard: "/dashboard",
  signin: "/signin",
};

export default ROUTES;
