import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: "buyer" | "agent" | "manager";
    status: "active" | "suspended" | "pending";
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "buyer" | "agent" | "manager";
      status: "active" | "suspended" | "pending";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "buyer" | "agent" | "manager";
    status: "active" | "suspended" | "pending";
  }
}
