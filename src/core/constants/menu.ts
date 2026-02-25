import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
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

export interface SubMenuItem {
  titleKey: string;
  url: string;
}

export interface DashboardItemBase {
  titleKey: string;
  icon: LucideIcon;
}

export interface DashboardItemLink extends DashboardItemBase {
  url: string;
  children?: never;
}

export interface DashboardItemWithChildren extends DashboardItemBase {
  url?: string;
  children: SubMenuItem[];
}

export type DashboardItem = DashboardItemLink | DashboardItemWithChildren;

export function hasSubmenu(
  item: DashboardItem
): item is DashboardItemWithChildren {
  return (
    "children" in item &&
    Array.isArray(item.children) &&
    item.children.length > 0
  );
}

export const dashboardItems: DashboardItem[] = [
  { titleKey: "classicDashboard", url: "/", icon: LayoutDashboard },
  {
    titleKey: "ecommerce",
    icon: ShoppingCart,
    children: [
      { titleKey: "ecommerceDashboard", url: "/dashboard/ecommerce" },
      { titleKey: "productList", url: "/dashboard/ecommerce/products" },
      { titleKey: "productDetail", url: "/dashboard/ecommerce/products/1" },
      { titleKey: "addProduct", url: "/dashboard/ecommerce/products/new" },
      { titleKey: "orderList", url: "/dashboard/ecommerce/orders" },
      { titleKey: "orderDetail", url: "/dashboard/ecommerce/orders/1" },
    ],
  },
  {
    titleKey: "paymentDashboard",
    icon: CreditCard,
    children: [
      { titleKey: "ecommerceDashboard", url: "/dashboard/payment" },
      { titleKey: "transactions", url: "/dashboard/payment/transactions" },
    ],
  },
  {
    titleKey: "hotel",
    icon: Building2,
    children: [
      { titleKey: "ecommerceDashboard", url: "/dashboard/hotel" },
      { titleKey: "booking", url: "/dashboard/hotel/booking" },
    ],
  },
  {
    titleKey: "projects",
    url: "/dashboard/projects",
    icon: FolderKanban,
  },
  { titleKey: "sales", url: "/dashboard/sales", icon: TrendingUp },
  { titleKey: "analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { titleKey: "files", url: "/dashboard/files", icon: FileStack },
  { titleKey: "crypto", url: "/dashboard/crypto", icon: Coins },
  { titleKey: "academy", url: "/dashboard/academy", icon: GraduationCap },
  {
    titleKey: "hospital",
    url: "/dashboard/hospital",
    icon: HeartPulse,
  },
  { titleKey: "finance", url: "/dashboard/finance", icon: Wallet },
];

export const accountItems: DashboardItem[] = [
  {
    titleKey: "profile",
    url: "/profile",
    icon: User,
  },
  { titleKey: "billing", url: "/billing", icon: CreditCard },
  {
    titleKey: "identityVerification",
    url: "/identity-verification",
    icon: ShieldCheck,
  },
];
