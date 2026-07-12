"use client";

import { Bell, Menu, Search } from "lucide-react";
import { IUserInfo } from "../../../../types/user.interface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import { INavSection } from "../../../../types/dashboard.interface";

interface DashboardNavbarContentProps {
  userInfo: IUserInfo;
  navItems?: INavSection[];
  dashboardHome?: string;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between h-16 gap-4 px-4 md:px-6">
        {/* Mobile Menu Toggle */}
        <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          {/* Hide the overlay on medium and larger screens */}
          <SheetContent side="left" className="w-64 p-0">
            <DashboardMobileSidebar
              userInfo={userInfo}
              navItems={navItems || []}
              dashboardHome={dashboardHome || ""}
            />
          </SheetContent>
        </Sheet>

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
