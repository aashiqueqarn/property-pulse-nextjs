import { withAuth } from "next-auth/middleware";

export default withAuth();

export const config = {
    matcher: ["/property/add", "/profile/:path*", "/properties/saved", "/messages/:path*"],
};