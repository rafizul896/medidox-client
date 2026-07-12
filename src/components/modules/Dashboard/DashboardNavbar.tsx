import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { IUserInfo } from "../../../../types/user.interface";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as IUserInfo;

  return <DashboardNavbarContent userInfo={userInfo} />;
};

export default DashboardNavbar;
