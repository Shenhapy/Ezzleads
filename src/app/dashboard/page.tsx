import { requireAuth } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await requireAuth();
  
  // Redirect to role-specific dashboard
  switch (session.user.role) {
    case "buyer":
      redirect("/dashboard/buyer");
    case "agent":
      redirect("/dashboard/agent");
    case "manager":
      redirect("/dashboard/manager");
    default:
      redirect("/");
  }
}
