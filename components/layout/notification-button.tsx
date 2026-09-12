'use client';

import { useState, useEffect } from 'react';
import { Bell, ShoppingBag, AlertTriangle, UserPlus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { api } from '@/lib/api';
import type { Notification } from '@/lib/types';
import { formatRelativeTime } from '@/lib/format';
import { cn } from '@/lib/utils';

const iconMap = {
  order: ShoppingBag,
  alert: AlertTriangle,
  customer: UserPlus,
  system: FileText,
} as const;

export function NotificationButton() {
  const [data, setData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNotifications().then((n) => {
      setData(n);
      setLoading(false);
    });
  }, []);

  const unreadCount = data.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Open notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {unreadCount} new
            </span>
          )}
        </div>
        <Separator />
        {loading ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            Loading notifications...
          </div>
        ) : data.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          <ScrollArea className="h-80">
            <div className="space-y-1 px-2 py-2">
              {data.map((n) => {
                const Icon = iconMap[n.type];
                return (
                  <div
                    key={n.id}
                    className={cn(
                      'flex gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-accent',
                      !n.read && 'bg-primary/5'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                        n.type === 'alert'
                          ? 'bg-destructive/10 text-destructive'
                          : n.type === 'order'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm font-medium leading-tight">
                        {n.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {n.description}
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        {formatRelativeTime(n.time)}
                      </p>
                    </div>
                    {!n.read && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
        <Separator />
        <button className="w-full px-4 py-2.5 text-center text-sm font-medium text-primary transition-colors hover:bg-accent">
          Mark all as read
        </button>
      </PopoverContent>
    </Popover>
  );
}
