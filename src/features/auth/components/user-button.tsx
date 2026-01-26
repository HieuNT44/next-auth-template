"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  Bell,
  CreditCard,
  LogOut,
  Settings,
  Sparkles
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export function UserButton() {
  const { data: session, status } = useSession();
  const t = useTranslations("navigation");

  // Mock data
  const mockUser = {
    name: session?.user?.name || "Admin",
    email: session?.user?.email || "admin@tomosia.com",
    image: session?.user?.image || undefined,
    credits: {
      used: 15,
      total: 20,
      remaining: 5,
    },
  };

  const initials = mockUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const creditsPercentage = (mockUser.credits.used / mockUser.credits.total) * 100;

  if (status === "loading") {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />;
  }

  if (!session?.user) {
    return (
      <Button variant="outline" size="sm" asChild>
        <Link href="/login">{t("login")}</Link>
      </Button>
    );
  }

  async function handleSignOut() {
    await signOut({ callbackUrl: "/login" });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={mockUser.image} alt={mockUser.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 p-0"
        sideOffset={8}
      >
        {/* User Profile Section */}
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={mockUser.image} alt={mockUser.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{mockUser.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {mockUser.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Navigation Items */}
        <div className="p-1">
          <DropdownMenuItem asChild>
            <Link
              href="/upgrade"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Upgrade to Pro</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/account"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Settings className="h-4 w-4" />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/billing"
              className="flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/notifications"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Logout */}
        <div className="p-1">
          <DropdownMenuItem
            onClick={handleSignOut}
            className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </div>

        {/* Credits Section */}
        <div className="border-t bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Credits</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{mockUser.credits.remaining} left</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
          <Progress value={creditsPercentage} className="h-2 mb-1" />
          <p className="text-xs text-muted-foreground">
            Daily credits used first
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
