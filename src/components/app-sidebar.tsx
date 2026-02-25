"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogoutButton } from "@/features/auth";
import { Link, usePathname } from "@/i18n/routing";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  ChevronRight,
  Coins,
  CreditCard,
  FileStack,
  FolderKanban,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SubMenuItem {
  title: string;
  url: string;
}

interface DashboardItemBase {
  title: string;
  icon: LucideIcon;
}

interface DashboardItemLink extends DashboardItemBase {
  url: string;
  children?: never;
}

interface DashboardItemWithChildren extends DashboardItemBase {
  url?: string;
  children: SubMenuItem[];
}

type DashboardItem = DashboardItemLink | DashboardItemWithChildren;

function hasSubmenu(item: DashboardItem): item is DashboardItemWithChildren {
  return (
    "children" in item &&
    Array.isArray(item.children) &&
    item.children.length > 0
  );
}

const dashboardItems: DashboardItem[] = [
  { title: "Classic Dashboard", url: "/", icon: LayoutDashboard },
  {
    title: "E-commerce",
    icon: ShoppingCart,
    children: [
      { title: "Dashboard", url: "/dashboard/ecommerce" },
      { title: "Product List", url: "/dashboard/ecommerce/products" },
      { title: "Product Detail", url: "/dashboard/ecommerce/products/1" },
      { title: "Add Product", url: "/dashboard/ecommerce/products/new" },
      { title: "Order List", url: "/dashboard/ecommerce/orders" },
      { title: "Order Detail", url: "/dashboard/ecommerce/orders/1" },
    ],
  },
  {
    title: "Payment Dashboard",
    icon: CreditCard,
    children: [
      { title: "Dashboard", url: "/dashboard/payment" },
      { title: "Transactions", url: "/dashboard/payment/transactions" },
    ],
  },
  {
    title: "Hotel Dashboard",
    icon: Building2,
    children: [
      { title: "Dashboard", url: "/dashboard/hotel" },
      { title: "Booking", url: "/dashboard/hotel/booking" },
    ],
  },
  {
    title: "Project Management",
    url: "/dashboard/projects",
    icon: FolderKanban,
  },
  { title: "Sales CRM", url: "/dashboard/sales", icon: TrendingUp },
  { title: "Website Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "File Manager", url: "/dashboard/files", icon: FileStack },
  { title: "Crypto", url: "/dashboard/crypto", icon: Coins },
  { title: "Academy/School", url: "/dashboard/academy", icon: GraduationCap },
  {
    title: "Hospital Management",
    url: "/dashboard/hospital",
    icon: HeartPulse,
  },
  { title: "Finance", url: "/dashboard/finance", icon: Wallet },
];

const accountItems = [
  { title: "Profile", url: "/profile", icon: User },
  {
    title: "Identity Verification",
    url: "/identity-verification",
    icon: ShieldCheck,
  },
];

const HOVER_CLOSE_DELAY_MS = 150;

export function AppSidebar() {
  const pathname = usePathname();
  const { state: sidebarState, isMobile, setOpenMobile } = useSidebar();
  const [openFlyoutKey, setOpenFlyoutKey] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mobile sheet on navigation (e.g. after clicking a sidebar link)
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  // usePathname from i18n returns path without locale (e.g. /profile, /dashboard/sales)
  const path = pathname ?? "/";
  const isActive = (href: string) => {
    if (href === "/") {
      return path === "/" || path === "";
    }
    return path === href || path.startsWith(href + "/");
  };

  const isGroupActive = (item: DashboardItemWithChildren) =>
    item.children.some((child) => isActive(child.url));

  const isCollapsed = sidebarState === "collapsed";

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = (key: string) => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setOpenFlyoutKey((k) => (k === key ? null : k));
      closeTimeoutRef.current = null;
    }, HOVER_CLOSE_DELAY_MS);
  };

  const handleFlyoutEnter = (key: string) => {
    clearCloseTimeout();
    setOpenFlyoutKey(key);
  };

  const handleFlyoutLeave = (key: string) => {
    scheduleClose(key);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, []);

  return (
    <Sidebar collapsible='icon' className='app-sidebar bg-sidebar'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              asChild
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <button
                type='button'
                className='peer/menu-button ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground hover:text-foreground flex h-10 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! group-data-[collapsible=icon]:px-0! hover:bg-(--primary)/5 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0'
              >
                <Image
                  src='/image/logo.webp'
                  alt='Logo'
                  width={30}
                  height={30}
                  className='me-1 rounded-[5px] transition-all group-data-[collapsible=icon]:me-0 group-data-[collapsible=icon]:size-8'
                />
                <span className='text-foreground font-semibold group-data-[collapsible=icon]:hidden'>
                  TOMOSIA VN
                </span>
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
              {dashboardItems.map((item) =>
                hasSubmenu(item) ? (
                  <SidebarMenuItem key={item.title}>
                    {isCollapsed ? (
                      <DropdownMenu
                        open={openFlyoutKey === item.title}
                        onOpenChange={(open) =>
                          setOpenFlyoutKey(open ? item.title : null)
                        }
                        modal={false}
                      >
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            onMouseEnter={() => handleFlyoutEnter(item.title)}
                            onMouseLeave={() => handleFlyoutLeave(item.title)}
                            className='data-[state=open]:text-sidebar-accent-foreground hover:bg-[#E4E4E7] data-[state=open]:bg-[#E4E4E7]'
                          >
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight className='ml-auto size-4 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-90' />
                          </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side='right'
                          sideOffset={4}
                          align='start'
                          onMouseEnter={() => handleFlyoutEnter(item.title)}
                          onMouseLeave={() => handleFlyoutLeave(item.title)}
                          className='min-w-44 rounded-md border bg-[#F4F4F5]'
                        >
                          {item.children.map((sub) => (
                            <DropdownMenuItem asChild key={sub.title}>
                              <Link
                                href={sub.url}
                                className='flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-[#E4E4E7] focus:bg-[#E4E4E7] data-[active=true]:bg-[#E4E4E7]'
                              >
                                {sub.title}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Collapsible
                        defaultOpen={isGroupActive(item)}
                        className='group/collapsible'
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className='data-[state=open]:text-sidebar-accent-foreground hover:bg-[#E4E4E7] data-[state=open]:bg-[#E4E4E7]'
                          >
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight className='ml-auto size-4 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-90' />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((sub) => (
                              <SidebarMenuSubItem
                                key={sub.title}
                                data-active={
                                  isActive(sub.url) ? "true" : undefined
                                }
                              >
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActive(sub.url)}
                                >
                                  <Link href={sub.url}>{sub.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem
                    key={item.title}
                    data-active={isActive(item.url) ? "true" : undefined}
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                      className='hover:bg-[#E4E4E7]'
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  data-active={isActive(item.url) ? "true" : undefined}
                >
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    className='hover:bg-[#E4E4E7] data-[active=true]:bg-gray-200 data-[active=true]:text-gray-900 dark:data-[active=true]:bg-gray-700 dark:data-[active=true]:text-gray-100'
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
              variant='ghost'
              size='sm'
              className='w-full justify-start'
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
