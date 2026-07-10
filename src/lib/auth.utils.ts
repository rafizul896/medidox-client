export type UserRole = "ADMIN" | "PATIENT" | "DOCTOR";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];

export const commomProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings"],
  patterns: [],
};

export const doctorProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/doctor/],
};

export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/],
};

export const patientProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/],
};

export const isAuthRoute = (pathName: string) => {
  return authRoutes.some((route: string) => route === pathName);
};

export const isRouteMatches = (
  pathName: string,
  routes: RouteConfig,
): boolean => {
  if (routes.exact.includes(pathName)) {
    return true;
  }

  return routes.patterns.some((pattern: RegExp) => pattern.test(pathName));
};

export const getRouteOwner = (
  pathName: string,
): "ADMIN" | "PATIENT" | "DOCTOR" | "COMMON" | null => {
  if (isRouteMatches(pathName, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathName, doctorProtectedRoutes)) {
    return "DOCTOR";
  }
  if (isRouteMatches(pathName, patientProtectedRoutes)) {
    return "PATIENT";
  }
  if (isRouteMatches(pathName, commomProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "DOCTOR") {
    return "/doctor/dashboard";
  }
  if (role === "PATIENT") {
    return "/dashboard";
  }

  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
): boolean => {
  const routerOwner = getRouteOwner(redirectPath);

  if (routerOwner === null || routerOwner === "COMMON") {
    return true;
  }

  if (routerOwner === role) {
    return true;
  }

  return false;
};
