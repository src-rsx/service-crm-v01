import {
  LayoutDashboard,
  Building2,
  MapPinned,
  Wrench,
  ClipboardList,
  Users,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    group: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    group: "Operations",
    items: [
      {
        label: "Service Calls",
        href: "/service-calls",
        icon: ClipboardList,
      },
    ],
  },

  {
    group: "Master Data",
    items: [
      {
        label: "Companies",
        href: "/companies",
        icon: Building2,
      },
      {
        label: "Sites",
        href: "/sites",
        icon: MapPinned,
      },
      {
        label: "Assets",
        href: "/assets",
        icon: Wrench,
      },
      {
        label: "Engineers",
        href: "/engineers",
        icon: Users,
      },
    ],
  },

  {
    group: "Administration",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];