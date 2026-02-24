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
  Sparkles,
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

  const creditsPercentage =
    (mockUser.credits.used / mockUser.credits.total) * 100;

  if (status === "loading") {
    return <div className='bg-muted h-9 w-9 animate-pulse rounded-full' />;
  }

  if (!session?.user) {
    return (
      <Button variant='outline' size='sm' asChild>
        <Link href='/login'>{t("login")}</Link>
      </Button>
    );
  }

  async function handleSignOut() {
    await signOut({ callbackUrl: "/login" });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='border-input h-9 w-9 cursor-pointer rounded-full border'
        >
          <Avatar className='h-9 w-9'>
            <AvatarImage src={"/image/avatar_men.png"} alt='Avatar' />
            <AvatarFallback className='bg-primary text-primary-foreground text-sm'>
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-80 p-0' sideOffset={8}>
        {/* User Profile Section */}
        <div className='flex items-center gap-3 p-4'>
          <Avatar className='h-10 w-10'>
            <AvatarImage src={"/image/avatar_men.png"} alt='Avatar' />
            <AvatarFallback className='bg-primary text-primary-foreground'>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-semibold'>{mockUser.name}</p>
            <p className='text-muted-foreground truncate text-xs'>
              {mockUser.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Navigation Items */}
        <div className='p-1'>
          <DropdownMenuItem asChild>
            <Link
              href='/upgrade'
              className='flex cursor-pointer items-center gap-2'
            >
              <Sparkles className='h-4 w-4' />
              <span>Upgrade to Pro</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href='/account'
              className='flex cursor-pointer items-center gap-2'
            >
              <Settings className='h-4 w-4' />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href='/billing'
              className='flex cursor-pointer items-center gap-2'
            >
              <CreditCard className='h-4 w-4' />
              <span>Billing</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href='/notifications'
              className='flex cursor-pointer items-center gap-2'
            >
              <Bell className='h-4 w-4' />
              <span>Notifications</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Logout */}
        <div className='p-1'>
          <DropdownMenuItem
            onClick={handleSignOut}
            className='text-destructive focus:text-destructive flex cursor-pointer items-center gap-2'
          >
            <LogOut className='h-4 w-4' />
            <span>Log out</span>
          </DropdownMenuItem>
        </div>

        {/* Credits Section */}
        <div className='bg-muted/30 border-t p-4'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-sm font-medium'>Credits</span>
            <div className='text-muted-foreground flex items-center gap-1 text-sm'>
              <span>{mockUser.credits.remaining} left</span>
              <ArrowRight className='h-3 w-3' />
            </div>
          </div>
          <Progress value={creditsPercentage} className='mb-1 h-2' />
          <p className='text-muted-foreground text-xs'>
            Daily credits used first
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
