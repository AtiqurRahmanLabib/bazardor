
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    const loginUrl = new URL("/sign-up", request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/productDetails/:path*"],
};
