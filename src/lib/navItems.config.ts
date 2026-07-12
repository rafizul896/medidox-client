"";

import { INavSection } from "../../types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth.utils";

export const getCommonNavItems = (role: UserRole): INavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          role: ["PATIENT", "DOCTOR", "ADMIN"],
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
          role: ["PATIENT", "DOCTOR", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings", // ✅ String
          role: ["PATIENT"],
        },
      ],
    },
  ];
};

export const doctorNavItems: INavSection[] = [
  {
    title: "Patient Management",
    items: [
      {
        title: "Appointments",
        href: "/doctor/dashboard/appoinments",
        icon: "Calendar", // ✅ String
        badge: "3",
        role: ["DOCTOR"],
      },
      {
        title: "My Schedules",
        href: "/doctor/dashboard/my-schedules",
        icon: "Clock", // ✅ String
        role: ["DOCTOR"],
      },
      {
        title: "Prescriptions",
        href: "/doctor/dashboard/prescriptions",
        icon: "FileText", // ✅ String
        role: ["DOCTOR"],
      },
    ],
  },
];

export const patientNavItems: INavSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appointments",
        href: "/dashboard/my-appointments",
        icon: "Calendar", // ✅ String
        role: ["PATIENT"],
      },
      {
        title: "Book Appointment",
        href: "/consultation",
        icon: "ClipboardList", // ✅ String
        role: ["PATIENT"],
      },
    ],
  },
  {
    title: "Medical Records",
    items: [
      {
        title: "My Prescriptions",
        href: "/dashboard/my-prescriptions",
        icon: "FileText", // ✅ String
        role: ["PATIENT"],
      },
      {
        title: "Health Records",
        href: "/dashboard/health-records",
        icon: "Activity", // ✅ String
        role: ["PATIENT"],
      },
    ],
  },
];

export const adminNavItems: INavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield", // ✅ String
        role: ["ADMIN"],
      },
      {
        title: "Doctors",
        href: "/admin/dashboard/doctors-management",
        icon: "Stethoscope", // ✅ String
        role: ["ADMIN"],
      },
      {
        title: "Patients",
        href: "/admin/dashboard/patients-management",
        icon: "Users", // ✅ String
        role: ["ADMIN"],
      },
    ],
  },
  {
    title: "Hospital Management",
    items: [
      {
        title: "Appointments",
        href: "/admin/dashboard/appointments-management",
        icon: "Calendar", // ✅ String
        role: ["ADMIN"],
      },
      {
        title: "Schedules",
        href: "/admin/dashboard/schedules-management",
        icon: "Clock", // ✅ String
        role: ["ADMIN"],
      },
      {
        title: "Specialities",
        href: "/admin/dashboard/specialities-management",
        icon: "Hospital", // ✅ String
        role: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): INavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "DOCTOR":
      return [...commonNavItems, ...doctorNavItems];
    case "PATIENT":
      return [...commonNavItems, ...patientNavItems];
    default:
      return [];
  }
};
