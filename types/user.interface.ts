import { UserRole } from "@/lib/auth.utils";

export interface IUserInfo {
    email: string,
    role: UserRole
}