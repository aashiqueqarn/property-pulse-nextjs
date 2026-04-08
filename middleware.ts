import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  }
});

export const config = {
  matcher: ["/property/add", "/profile/:path*", "/properties/saved", "/messages/:path*"],
};