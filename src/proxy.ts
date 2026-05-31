import { auth } from "@/auth/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const isAuthRoute =
    req.nextUrl.pathname.startsWith("/login");

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/companies/:path*",
    "/sites/:path*",
    "/assets/:path*",
    "/engineers/:path*",
    "/service-calls/:path*",
    "/settings/:path*",
  ],
};