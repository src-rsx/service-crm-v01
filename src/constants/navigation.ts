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
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
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
    label: "Service Calls",
    href: "/service-calls",
    icon: ClipboardList,
  },
  {
    label: "Engineers",
    href: "/engineers",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];