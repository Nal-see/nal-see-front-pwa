// ChatBubble.tsx
import { convertImgSrcToHTTPS } from '@/lib/helpers';
import useAuthStore from '@/store/useAuthStore';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const moveProfile = () => {
    navigate(`/user/${senderId}`);
  };
  const splitMsg = msg.match(/.{1,25}/g) || [msg];

  return (
    <div
      className={`m-2 flex items-center text-base ${
        isMyMessage ? 'ml-auto flex-row-reverse' : 'flex-row'
      }`}
    >
      {!isMyMessage && receiverImage && (
        <img
          className="mr-3 size-10 rounded-full"
          onClick={moveProfile}
          src={convertImgSrcToHTTPS(receiverImage)}
          alt="receiver"
        />
      )}
      <div
        className={`whitespace-pre-wrap rounded-2xl p-2 px-4 ${
          isMyMessage ? 'bg-accent text-slate-50' : 'bg-[#E2E6E9]'
        }`}
      >
        {splitMsg.join('\n')}
      </div>
    </div>
  );
};

export default ChatBubble;
