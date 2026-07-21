import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "ADMIN";
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isProtectedUserRoute = 
        nextUrl.pathname.startsWith("/checkout") || 
        nextUrl.pathname.startsWith("/orders") || 
        nextUrl.pathname.startsWith("/profile");

      if (isOnAdmin) {
        // Protect /admin routes. Only allow admins.
        // Wait, what if it's /admin/login?
        if (nextUrl.pathname === "/admin/login") {
            if (isLoggedIn && isAdmin) {
                return Response.redirect(new URL("/admin", nextUrl));
            }
            return true;
        }

        if (isLoggedIn && isAdmin) return true;
        return false;
      }
      
      if (isProtectedUserRoute) {
        if (isLoggedIn) return true;
        return false;
      }
      
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  },
  providers: [], 
} satisfies NextAuthConfig;
