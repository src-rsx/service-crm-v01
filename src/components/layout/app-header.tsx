import { auth } from "@/auth/auth";
import { PageTitle } from "./page-title";

export async function AppHeader() {
  const session = await auth();

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div>
        <PageTitle />
      </div>

      <div className="text-right">
        <div className="font-medium">
          {session?.user?.name}
        </div>

        <div className="text-muted-foreground text-sm">
          {session?.user?.role}
        </div>
      </div>
    </header>
  );
}