import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AfterLoginPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  redirect(`/user/${session.user.username}`);
}
