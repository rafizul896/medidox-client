"use server";

import { IUserInfo } from "../../../types/user.interface";
import { getCookie } from "./tokenHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserInfo = async (): Promise<IUserInfo | null> => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return null;
    }

    const verifyToken = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;

    const userInfo: IUserInfo = {
      email: verifyToken.email,
      role: verifyToken.role,
    };

    return userInfo;
  } catch (err) {
    console.error("Error getting user info:", err);
    return null;
  }
};
