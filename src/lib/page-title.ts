export function getPageTitle(pathname: string) {
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/companies": "Companies",
    "/sites": "Sites",
    "/assets": "Assets",
    "/service-calls": "Service Calls",
    "/engineers": "Engineers",
    "/settings": "Settings",
  };

  return titles[pathname] ?? "CRM";
}