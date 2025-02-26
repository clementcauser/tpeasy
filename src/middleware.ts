import { auth } from "@/lib/auth";
import ROUTES, { PUBLIC_ROUTES } from "@/lib/constants/routes";
import { NextResponse } from "next/server";

const isPublicRoute = (pathname: string) => PUBLIC_ROUTES.includes(pathname);

export default auth((req) => {
  const shouldBeRedirected = !req.auth && !isPublicRoute(req.nextUrl.pathname);

  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  if (req.auth) {
    if (
      ![ROUTES["create-company"]].includes(req.nextUrl.pathname) &&
      req.auth.user.companyId === null
    ) {
      const createCompanyURL = new URL(
        ROUTES["create-company"],
        req.nextUrl.origin
      );

      return NextResponse.redirect(createCompanyURL);
    } else if (
      !!req.auth.user?.companyId &&
      [ROUTES["create-company"]].includes(req.nextUrl.pathname)
    ) {
      const newURL = new URL(ROUTES.dashboard, req.nextUrl.origin);

      return NextResponse.redirect(newURL);
    }
  }

  if (req.auth && [ROUTES.signin, ROUTES.root].includes(req.nextUrl.pathname)) {
    const newURL = new URL(ROUTES.dashboard, req.nextUrl.origin);

    return NextResponse.redirect(newURL);
  }

  if (shouldBeRedirected) {
    const newUrl = new URL(ROUTES.signin, req.nextUrl.origin);

    return NextResponse.redirect(newUrl);
  }
});
