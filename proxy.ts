import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

interface SafeUser {
  id?: string;
  email?: string;
  isAdmin?: boolean;
}

interface SafeSession {
  user?: SafeUser;
}

export default async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isDashboard = pathname.startsWith("/dashboard");
  const isAdminArea = pathname.startsWith("/admin");
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // Resolve session defensively: ignore errors (e.g. missing AUTH_SECRET)
  let session: SafeSession | null = null;
  try {
    const authFn = auth as unknown as () => Promise<SafeSession | null>;
    session = await authFn();
  } catch {
    session = null;
  }

  // A user is only considered logged in when there is an actual user with an id.
  const user: SafeUser | undefined = session?.user;
  const isLoggedIn = !!user?.id;
  const isAdmin = !!user?.isAdmin;

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
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup"],
};
