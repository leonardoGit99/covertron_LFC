import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { pathname } = req.nextUrl;

  let isAuthenticated = false;

  if (token) {
    try {
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  // 1. Si está logueado y va a login --> redirige al dashboard
  if (pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 2. Si NO está logueado y quiere entrar a rutas protegidas --> redirige a login
  if (pathname.startsWith("/admin") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Para que rutas va a actuar el middleware
export const config = {
  matcher: [
    "/login",
    "/admin/:path*",
  ],
};
