'use client';

import { ChatMembers, chatMembersRef } from '@/lib/converters/ChatsMembers';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Badge } from '@/components/ui/badge';
import useIsAdmin from '@/hooks/useAdminId';
import UserAvatar from './UserAvatar';
import LoadingSpinner from './loadingSpinner';
import { useSession } from 'next-auth/react';
import { X } from 'lucide-react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { toast } from './ui/use-toast';

function ChatMembersBadges({ chatId }: { chatId: string }) {
  const [members, loading] = useCollectionData<ChatMembers>(chatMembersRef(chatId));
  const adminId = useIsAdmin({ chatId });
  const { data: session } = useSession();

  if (loading && !members) return <LoadingSpinner />;

  const handleRemoveUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, `chats/${chatId}/members/${userId}`));
      toast({
        title: 'User removed',
        description: 'The user has been removed from the chat.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to remove user.',
        variant: 'destructive',
      });
      console.error(err);
    }
  };

  return (
    !loading && (
      <div className='p-2 border rounded-xl m-5'>
        <div className='flex flex-wrap justify-center md:justify-start items-center gap-2 p-2'>
          {members
            ?.sort((a, b) => (a.userId === adminId ? -1 : b.userId === adminId ? 1 : 0))
            .map((member) => (
              <Badge
                variant='secondary'
                key={member.email}
                className='h-14 p-5 pl-2 pr-5 flex space-x-2 items-center relative'
              >
                <div className='flex items-center space-x-2'>
                  <UserAvatar name={member.email} image={member.image} />
                </div>

                <div>
                  <p>{member.email}</p>
                  {member.userId === adminId && (
                    <p className='text-indigo-400 animate-pulse'>Admin</p>
                  )}
                </div>

                {/* Remove icon only visible if current user is admin and this member is not admin */}
                {session?.user.id === adminId && member.userId !== adminId && (
                  <button
                    onClick={() => handleRemoveUser(member.userId)}
                    className='absolute -top-2 -right-2 text-red-500 hover:text-red-700'
                    title='Remove User'
                  >
                    <X className='w-6 h-6' />
                  </button>
                )}
              </Badge>
            ))}
        </div>
      </div>
    )
  );
}

export default ChatMembersBadges;
