"use client";

import { logOutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logOutUser();
  };

  return (
    <>
      <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default LogoutButton;
