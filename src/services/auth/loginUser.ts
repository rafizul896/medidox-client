/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth.utils";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";

const loginValidationZodSchema = z.object({
  email: z.email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUser = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect");
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validatedFields = loginValidationZodSchema.safeParse(loginData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const setCookieHeaders = response.headers?.getSetCookie();
    const res = await response.json();

    if (!res.success) {
      return { message: "Login Failed" };
    }

    if (setCookieHeaders && setCookieHeaders?.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }

        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    const verifiedToken = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;

    console.log(verifiedToken)

    const userRole: UserRole = verifiedToken.role;

    if (redirectTo && userRole) {
      const requestedPath = redirectTo.toString();

      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(requestedPath);
      } else {
        redirect(getDefaultDashboardRoute(userRole));
      }
    }
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    console.log(err);
    return { message: "Login Failed" };
  }
};
