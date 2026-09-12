'use client';

import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MobileNav } from './mobile-nav';
import { NotificationButton } from './notification-button';
import { UserMenu } from './user-menu';
import { navItems } from '@/lib/nav';

export function Header() {
  const pathname = usePathname();
  const currentNav = navItems.find(
    (item) =>
      item.href === '/'
        ? pathname === '/'
        : pathname.startsWith(item.href)
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <MobileNav />
      <h1 className="text-base font-semibold sm:text-lg">
        {currentNav?.label ?? 'Overview'}
      </h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="h-9 w-48 pl-9 lg:w-64"
          />
        </div>
        <NotificationButton />
        <UserMenu />
      </div>
    </header>
  );
}
