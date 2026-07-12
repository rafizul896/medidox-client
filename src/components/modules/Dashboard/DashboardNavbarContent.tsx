"use client";

import { Bell, Search } from "lucide-react";
import { IUserInfo } from "../../../../types/user.interface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";

const DashboardNavbarContent = ({
  userInfo,
}: {
  userInfo: IUserInfo;
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between h-16 gap-4 px-4 md:px6">
        {/* Search bar*/}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="text" placeholder="Search..." className="pl-9" />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-0 top-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              2
            </span>
          </Button>
        </div>

        {/* User Dropdown */}
        <UserDropdown userInfo={userInfo} />
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
