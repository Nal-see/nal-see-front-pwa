// ChatBubble.tsx
import { ProfileImage } from '@/features/Feed/components/FeedCard/FeedCardStyle';
import useAuthStore from '@/store/useAuthStore';
import React from 'react';

interface ChatBubbleProps {
  msg: string;
  senderId: number | string;
  receiverImage: string | null;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  msg,
  senderId,
  receiverImage = null,
}) => {
  const myId = useAuthStore.getState().user?.userId;
  const isMyMessage = myId == String(senderId);
  console.log('isMyMessage: ', isMyMessage);

  return (
    <div
      className={`m-2 flex items-center ${
        isMyMessage ? 'ml-auto flex-row-reverse' : 'flex-row'
      }`}
    >
      {!isMyMessage && receiverImage && (
        <ProfileImage src={receiverImage} alt="receiver" className="mr-2" />
      )}
      <div
        className={`rounded-2xl p-2 px-4 ${
          isMyMessage ? 'bg-accent' : 'bg-gray-300'
        }`}
      >
        {msg}
      </div>
    </div>
  );
};

export default ChatBubble;
