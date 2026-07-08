import { NextRequest, NextResponse } from "next/server";

type UserRole = "ADMIN" | "PATIENT" | "DOCTOR";

type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

const authRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];

const commomProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings"],
  patterns: [],
};

const doctorProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/doctor/],
};

const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/],
};

const patientProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/],
};

export const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  console.log(pathname);
  console.log("pathname");

  return NextResponse.next();
};
