"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='notification-button relative h-9 w-9'
          aria-label='Open notifications'
        >
          <Bell className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-80'>
        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <Bell className='text-muted-foreground mb-2 size-10' />
          <p className='text-foreground text-sm font-medium'>
            No notifications
          </p>
          <p className='text-muted-foreground mt-1 text-xs'>
            You&apos;re all caught up.
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
