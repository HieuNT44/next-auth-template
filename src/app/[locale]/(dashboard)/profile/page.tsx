import { getServerSession } from "next-auth";
import { authOptions } from "@/core/lib/auth";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Calendar, Shield, Edit } from "lucide-react";

interface ProfilePageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{user.name || "User"}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400 mb-4">
              <Shield className="mr-1 h-3 w-3" />
              Active Account
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your personal information and account details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Email Address</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <Separator />

            {/* Name */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Full Name</p>
                <p className="text-sm text-muted-foreground">
                  {user.name || "Not provided"}
                </p>
              </div>
            </div>

            <Separator />

            {/* Account Created */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Account Created</p>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Sessions</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Last Login</CardDescription>
            <CardTitle className="text-3xl">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleTimeString(locale, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Account Status</CardDescription>
            <CardTitle className="text-3xl text-green-600">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
