import { UserRole } from "@/lib/auth.utils";

export interface INavItems {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  description?: string;
  role?: UserRole[];
}

export interface INavSection {
  title?: string;
  items: INavItems[];
}