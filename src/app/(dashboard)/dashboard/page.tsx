import { auth } from "@/auth/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <pre>
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}