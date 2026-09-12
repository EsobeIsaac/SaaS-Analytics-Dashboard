'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity } from 'lucide-react';
import { navItems } from '@/lib/nav';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-card lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Activity className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight">PulseBoard</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-xs font-medium text-foreground">
            Need help?
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Check our documentation or contact support.
          </p>
          <button className="mt-3 w-full rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            View Docs
          </button>
        </div>
      </div>
    </aside>
  );
}
