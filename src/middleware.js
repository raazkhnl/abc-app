import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (request.nextUrl.pathname.startsWith('/uploads/')) {
    return NextResponse.next();
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard/about", request.url));
  }

  if (token && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/about", request.url));
  }

  if (!token && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard", '/uploads/:path*'], // Apply middleware only to these paths
};