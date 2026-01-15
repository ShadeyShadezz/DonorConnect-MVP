import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const protectedPaths = [
    "/dashboard",
    "/donors",
    "/donations",
    "/campaigns",
    "/tasks",
    "/ai-insights",
    "/admin",
    "/api/donors",
    "/api/donations",
    "/api/campaigns",
    "/api/tasks",
    "/api/ai",
  ];

  const isProtectedPath = protectedPaths.some(p => path.startsWith(p));

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (path.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/donors/:path*",
    "/donations/:path*",
    "/campaigns/:path*",
    "/tasks/:path*",
    "/ai-insights/:path*",
    "/admin/:path*",
    "/api/donors/:path*",
    "/api/donations/:path*",
    "/api/campaigns/:path*",
    "/api/tasks/:path*",
    "/api/ai/:path*",
  ],
};
