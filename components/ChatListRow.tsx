'use client';

import { Message, limitedSortedMessagesRef } from '@/lib/converters/Message';
import { useRouter } from 'next/navigation';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import { useLanguageStore } from '@/store/store';
import UserAvatar from './UserAvatar';
import DeleteChatButton from './DeleteChatButton';
import { useState } from 'react';
import InviteUser from './InviteUser';

function ChatListRow({ chatId }: { chatId: string }) {
  const [messages, loading] = useCollectionData<Message>(limitedSortedMessagesRef(chatId));
  const language = useLanguageStore((state) => state.language);
  const { data: session } = useSession();
  const [openShareChatId, setOpenShareChatId] = useState<string | null>(null);

  const router = useRouter();

  function prettyUUID(n = 4) {
    return chatId.substring(0, n);
  }

  const row = (message?: Message) => (
    <div
      key={chatId}
      className='flex justify-between items-center p-5 hover:bg-gray-100 dark:hover:bg-slate-700'
    >
      <div
        onClick={() => router.push(`/chat/${chatId}`)}
        className='flex items-center space-x-2 cursor-pointer flex-1'
      >
        <UserAvatar
          name={message?.user.name || session?.user.name}
          image={message?.user.image || session?.user.image}
        />

        <div className='flex-1'>
          <p className='font-bold'>
            {!message && 'New Chat'}
            {message && [message?.user.name || session?.user.name].toString().split(' ')[0]}
          </p>

          <p className='text-gray-400 line-clamp-1'>
            {message?.translated?.[language] || 'Get the conversation started...'}
          </p>
        </div>

        <div className='text-xs text-gray-400 text-right'>
          <p>{message ? new Date(message.timestamp).toLocaleTimeString() : 'No messages yet'}</p>
          <p>chat #{prettyUUID()}</p>
        </div>
      </div>

      {/* Delete + Share */}
      <div className='ml-4 flex space-x-2'>
        <DeleteChatButton chatId={chatId} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenShareChatId(chatId);
          }}
          className='text-sm text-indigo-500 hover:underline'
          title='Share Chat Link'
        >
          Connect People
        </button>
      </div>
    </div>
  );

  return (
    <div className=''>
      {loading && (
        <div className='flex p-5 items-center space-x-2'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2 flex-1'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-1/4' />
          </div>
        </div>
      )}

      {messages?.length === 0 && !loading && row()}
      {messages?.map((message) => row(message))}

      {openShareChatId && <InviteUser chatId={chatId} />}
    </div>
  );
}

export default ChatListRow;
