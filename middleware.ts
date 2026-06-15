export { default } from "next-auth/middleware";

// Protect all /admin routes. The login page is excluded so unauthenticated
// users can reach it; NextAuth redirects others there automatically.
export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/products/:path*",
    "/admin/collections/:path*",
    "/admin/settings/:path*",
  ],
};
