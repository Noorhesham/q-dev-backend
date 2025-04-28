import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authRoutes, protectedRoutes } from "./routes";

export async function middleware(req: NextRequest) {


  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!.*\\..*|_next).*)"],
};
