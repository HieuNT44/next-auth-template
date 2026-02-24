"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { NotificationButton } from "@/components/notification-button";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserButton } from "@/features/auth";
import { Link, usePathname } from "@/i18n/routing";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProfile = pathname === "/profile" || pathname.startsWith("/profile/");
  const isProfileSettings = pathname.startsWith("/profile/settings");

  return (
    <div className='w-full max-w-full min-w-0 overflow-x-hidden'>
      <SidebarProvider className='max-w-full min-w-0'>
        <AppSidebar />
        <SidebarInset className='max-w-full min-w-0'>
          <header className='bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              orientation='vertical'
              className='mr-2 data-[orientation=vertical]:h-4'
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='/' asChild>
                    <Link href='/'>Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                {isProfile && (
                  <>
                    <BreadcrumbItem className='hidden md:block'>
                      {isProfileSettings ? (
                        <BreadcrumbLink href='/profile' asChild>
                          <Link href='/profile'>Profile</Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>Profile</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {isProfileSettings && (
                      <>
                        <BreadcrumbSeparator className='hidden md:block' />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Settings</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    )}
                  </>
                )}
                {!isProfile && (
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
            <div className='ml-auto flex items-center gap-2'>
              <ThemeSwitcher />
              <ThemeModeToggle />
              <NotificationButton />
              <Separator
                orientation='vertical'
                className='mx-2 data-[orientation=vertical]:h-4'
              />
              <UserButton />
            </div>
          </header>
          <div className='min-h-0 min-w-0 flex-1 overflow-auto'>
            <div className='flex flex-col gap-4 p-4 lg:p-6'>{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
