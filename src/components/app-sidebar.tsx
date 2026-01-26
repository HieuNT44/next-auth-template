"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LogoutButton } from "@/features/auth";
import { User, ChevronsUpDown } from "lucide-react";
import Image from "next/image";

const menuItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en|ja)/, "") || "/";
    if (href === "/") {
      return pathWithoutLocale === "/";
    }
    return pathWithoutLocale.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <button
                type="button"
                className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 text-sm hover:text-foreground h-10 group-data-[collapsible=icon]:px-0! hover:bg-[var(--primary)]/5"
              >
                <Image
                  src="/image/logo.webp"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="me-1 rounded-[5px] transition-all group-data-collapsible:size-6 group-data-[collapsible=icon]:size-8"
                />
                <span className="text-foreground font-semibold group-data-[collapsible=icon]:hidden">
                  Dashboard
                </span>
                <ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden" />
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LogoutButton
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
