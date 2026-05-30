import { db } from "@/db";

export default async function TestPage() {
  const users = await db.query.users.findMany({
    with: {
      tenant: true,
    },
  });

  return (
    <pre>
      {JSON.stringify(users, null, 2)}
    </pre>
  );
}