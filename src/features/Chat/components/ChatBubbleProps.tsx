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

  // 메시지를 15글자 단위로 분할하여 배열로 저장
  const splitMsg = msg.match(/.{1,25}/g) || [msg];

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
        className={`whitespace-pre-wrap rounded-2xl p-2 px-4 ${
          isMyMessage ? 'bg-accent' : 'bg-gray-300'
        }`}
      >
        {splitMsg.join('\n')}
      </div>
    </div>
  );
};

export default ChatBubble;
