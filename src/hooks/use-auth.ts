"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return { session, status };
}

export function useRequireRole(allowedRoles: Array<"buyer" | "agent" | "manager">) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (!allowedRoles.includes(session.user.role)) {
        router.push("/unauthorized");
      }
    }
  }, [status, session, allowedRoles, router]);

  return { session, status };
}
