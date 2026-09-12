import {
  LayoutDashboard,
  BarChart3,
  CreditCard,
  Users,
  Package,
  Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Transactions', href: '/transactions', icon: CreditCard },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'Settings', href: '/settings', icon: Settings },
];
