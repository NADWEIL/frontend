import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Protection routes admin/sort - auth required
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/sort/:path*"],
};
