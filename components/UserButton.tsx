'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { Session } from 'next-auth';
import ManageAccountButton from './ManageAccountButton';
import { useSubscriptionStore } from '@/store/store';
import LoadingSpinner from './loadingSpinner';
import { StarIcon } from 'lucide-react';
import UserAvatar from './UserAvatar';

function UserButton({ session }: { session: Session | null }) {
  const subscription = useSubscriptionStore((state) => state.subscription);

  if (!session) {
    return (
      <Button className='' onClick={() => signIn()} variant='outline'>
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      {session && (
        <>
          <DropdownMenuTrigger>
            <UserAvatar name={session.user.name} image={session.user.image} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Hi {session.user.name}!</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {subscription === undefined && (
              <DropdownMenuItem>
                <LoadingSpinner />
              </DropdownMenuItem>
            )}

            {subscription?.role === 'pro' && (
              <>
                <DropdownMenuLabel className='text-xs flex items-center justify-center space-x-1 text-[#E935C1] animate-pulse'>
                  <StarIcon fill='#E935C1' />
                  <p>PRO</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <ManageAccountButton />
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </>
      )}
    </DropdownMenu>
  );
}

export default UserButton;
