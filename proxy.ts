import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdmin = !!(req.auth?.user as unknown as { isAdmin?: boolean })?.isAdmin;
  const pathname = req.nextUrl.pathname;

  const isDashboard = pathname.startsWith("/dashboard");
  const isAdminArea = pathname.startsWith("/admin");
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isDashboard && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminArea) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
  }

  if (isAuthPage && isLoggedIn) {
    const dest = isAdmin ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(dest, req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup"],
};
