import { NextResponse } from "next/server";
import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const protectedRoutes = [
  "/dashboard",
  "/collection",
  "/journal",
];

// shield and bot detection - Arcjet
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules:[
    shield({
      mode: "LIVE"
    }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
  ],
});

async function middleware(request) {
  // Skip Kinde auth routes
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const pathname = request.nextUrl.pathname;

  if (!user && protectedRoutes.some(route => pathname.startsWith(route))) {
    const signInUrl = new URL('/api/auth/login', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export default createMiddleware(aj, middleware);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};