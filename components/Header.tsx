// REMOVE 'use client' ❌

import Link from 'next/link';
import UserButton from './UserButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { MessagesSquareIcon } from 'lucide-react';
import Logo from './Logo';
import DarkModeToggle from './DarkModeToggle';
import UpgradeBanner from './UpgradeBanner';
import LanguageSelect from './LanguageSelect';
import CreateChatButton from './CreateChatButton';

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className='sticky top-0 z-50 bg-white dark:bg-gray-900'>
      <nav className='flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto'>
        <Logo />

        <div className='flex-1 flex items-center justify-end space-x-4'>
          <LanguageSelect />

          {session ? (
            <>
              <Link
                href='/chat'
                prefetch={false}
                className='flex items-center gap-1 text-black dark:text-white hover:underline'
              >
                <MessagesSquareIcon className='w-5 h-5' />
                <span>Chats</span>
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <>
              {/* BETA: Hide pricing for now */}
              {/*
              <Link
                href='/pricing'
                prefetch={false}
                className='text-black dark:text-white hover:underline'
              >
                View Pricing
              </Link>
              */}
            </>
          )}

          <DarkModeToggle />
          <UserButton session={session} />
        </div>
      </nav>

      <UpgradeBanner />
    </header>
  );
}
