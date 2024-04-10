// ChatBubble.tsx
import { ProfileImage } from '@/features/Feed/components/FeedCard/FeedCardStyle';
import React from 'react';

interface ChatBubbleProps {
  content: string;
  senderId: number | string;
  receiverImage: string | null;
  myId: string | undefined;
  name: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  senderId,
  receiverImage = null,
  myId,
}) => {
  const isMyMessage = myId == String(senderId);

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
        {content}
      </div>
    </div>
  );
};

export default ChatBubble;
