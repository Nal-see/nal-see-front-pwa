import CircleProfileImg from '@/components/CircleProfileImg';
import { useNavigate } from 'react-router-dom';

interface IChatItemProps {
  chatId: string;
  username: string;
  profileImgUrl: string;
  lastMessage: string;
  lastUpdatedDate: string;
  read: boolean;
}

const ChatItem = ({
  chatId,
  username,
  profileImgUrl,
  lastMessage,
  lastUpdatedDate,
  read,
}: IChatItemProps) => {
  const navigate = useNavigate();

  const enterChatRoom = () => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div
      onClick={enterChatRoom}
      className="flex w-dvw flex-row items-center justify-between px-7 py-5 active:bg-accent-foreground"
    >
      <div className="flex w-[85%] flex-row items-center gap-5">
        <CircleProfileImg size="size-[50px]" profileImgUrl={profileImgUrl} />
        <div className="flex w-[70%] flex-col justify-start">
          <p
            className={`text-lg font-medium ${read ? 'text-primary-foreground' : ''}`}
          >
            {username}
          </p>
          <div
            className={`flex flex-row justify-start gap-2 text-base ${read ? 'text-primary-foreground' : ''}`}
          >
            <p className="truncate">{lastMessage}</p>
            <p className="text-nowrap">{lastUpdatedDate}</p>
          </div>
        </div>
      </div>

      {/* 읽지 않은 메시지인 경우 우측에 표시 */}
      {!read && <div className="size-3 rounded-full bg-accent"></div>}
    </div>
  );
};

export default ChatItem;
