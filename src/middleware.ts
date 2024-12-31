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

  if (
    req.auth &&
    req.auth.user.companyId === null &&
    ![ROUTES["create-company"]].includes(req.nextUrl.pathname)
  ) {
    const createCompanyURL = new URL(
      ROUTES["create-company"],
      req.nextUrl.origin
    );

    return NextResponse.redirect(createCompanyURL);
  }

  if (req.auth && [ROUTES.signin].includes(req.nextUrl.pathname)) {
    const newURL = new URL(ROUTES.dashboard, req.nextUrl.origin);

    return NextResponse.redirect(newURL);
  }

  if (shouldBeRedirected) {
    const newUrl = new URL(ROUTES.signin, req.nextUrl.origin);

    return NextResponse.redirect(newUrl);
  }
});
