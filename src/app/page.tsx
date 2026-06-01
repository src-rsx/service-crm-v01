import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  redirect("/login");
}