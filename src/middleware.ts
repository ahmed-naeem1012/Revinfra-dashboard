import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("authToken"); // Replace with your actual auth token logic

  const publicPaths = ["/auth/signin", "/auth/signup"];
  const authPaths = ["/"]; // Add authenticated routes

  if (!token && !publicPaths.includes(pathname)) {
    // If the user is not authenticated and tries to access a protected route
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (token && publicPaths.includes(pathname)) {
    // If the user is authenticated but tries to access public (auth) pages
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request if it doesn't match any of the above conditions
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard", 
    "/auth/signin",    
    "/auth/signup",   
    "/profile", 
    "/", 
  ],
};
