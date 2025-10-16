"use client";

import { useRequireRole } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, DollarSign, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function AgentDashboardPage() {
  const { session, status } = useRequireRole(["agent"]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Agent Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome back, {session?.user?.name}!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Leads submitted
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">
                From sold leads
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Leads</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Live in marketplace
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your leads</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/agent/submit-lead">
              <Button className="w-full justify-start gap-2">
                <Plus className="h-4 w-4" />
                Submit New Lead
              </Button>
            </Link>
            <Link href="/dashboard/agent/leads">
              <Button className="w-full justify-start" variant="outline">
                View My Leads
              </Button>
            </Link>
            <Link href="/dashboard/agent/earnings">
              <Button className="w-full justify-start" variant="outline">
                Earnings & Payouts
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
