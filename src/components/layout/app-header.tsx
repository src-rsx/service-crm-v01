import { auth } from "@/auth/auth";

import { PageTitle } from "./page-title";

export async function AppHeader() {
  const session = await auth();

  return (
    <header className="flex h-20 items-center justify-between border-b px-6">
      <PageTitle />

      <div className="text-right">
        <div className="font-medium">
          {session?.user?.name}
        </div>

        <div className="text-sm text-muted-foreground">
          {session?.user?.role}
        </div>
      </div>
    </header>
  );
}