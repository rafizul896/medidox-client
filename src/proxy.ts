import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth.utils";
import { deleteCookie, getCookie } from "./services/auth/tokenHandler";

export const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  let userRole: UserRole | null = null;

  const accessToken = await getCookie("accessToken");


  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string,
    );

    if (typeof verifiedToken === "string") {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");

      return NextResponse.redirect(new URL("/login", req.url));
    }

    userRole = verifiedToken.role;
  }

  const routerOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoute(pathname);

  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), req.url),
    );
  }

  if (routerOwner === null) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginURL = new URL("/login", req.url);
    loginURL.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginURL);
  }

  if (routerOwner === "COMMON") {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  if (
    routerOwner === "ADMIN" ||
    routerOwner === "DOCTOR" ||
    routerOwner === "PATIENT"
  ) {
    if (userRole !== routerOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), req.url),
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
};
