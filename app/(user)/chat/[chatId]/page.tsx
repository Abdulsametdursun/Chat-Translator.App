import { authOptions } from '@/auth';
import AdminControls from '@/components/AdminControls';
import ChatInput from '@/components/ChatInput';
import ChatMembersBadges from '@/components/ChatMembersBadges';
import ChatMessages from '@/components/ChatMessages';
import { chatMembersRef, addChatRef } from '@/lib/converters/ChatsMembers';
import { sortedMessagesRef } from '@/lib/converters/Message';
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { db } from '@/firebase';

type Props = {
  params: {
    chatId: string;
  };
  searchParams?: {
    join?: string;
  };
};

async function Chats({ params: { chatId }, searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/');

  const userId = session.user.id;
  const memberDocs = await getDocs(chatMembersRef(chatId));
  const memberIds = memberDocs.docs.map((doc) => doc.id);
  const hasAccess = memberIds.includes(userId);

  // ✅ Auto-Join via share link if not a member and link contains ?join=true
  if (!hasAccess && searchParams?.join === 'true') {
    await setDoc(addChatRef(chatId, userId), {
      userId,
      email: session.user.email!,
      chatId,
      image: session.user.image || '',
      isAdmin: false,
      timestamp: serverTimestamp(),
    });

    // ✅ Redirect to clean URL (without ?join=true)
    redirect(`/chat/${chatId}`);
  }

  // 🚫 Redirect if not allowed
  if (!hasAccess) redirect('/chat?error=permission');

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map((doc) => doc.data());

  return (
    <>
      <AdminControls chatId={chatId} />
      <ChatMembersBadges chatId={chatId} />

      <div className='flex-1'>
        <ChatMessages chatId={chatId} session={session} initialMessages={initialMessages} />
      </div>

      <ChatInput chatId={chatId} />
    </>
  );
}

export default Chats;
