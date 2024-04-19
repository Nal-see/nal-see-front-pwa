import CircleProfileImg from '@/components/CircleProfileImg';
import { convertImgSrcToHTTPS, formatNotificationDate } from '@/lib/helpers';
import useAuthStore from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

interface IChatItemProps {
  chatId: string;
  username: string;
  profileImgUrl: string | null;
  lastMessage: string;
  lastUpdatedDate: string;
  readCnt: number;
  senderId: string;
  isOnline?: boolean;
}

const ChatItem = ({
  chatId,
  username,
  profileImgUrl,
  lastMessage,
  lastUpdatedDate,
  readCnt,
  senderId,
  isOnline,
}: IChatItemProps) => {
  const userId = useAuthStore.getState().user?.userId;
  const read = readCnt == 0 || senderId == userId;
  const updatedDate = formatNotificationDate(lastUpdatedDate);
  const navigate = useNavigate();

  console.log('isOnline: ', isOnline);
  const enterChatRoom = () => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div
      onClick={enterChatRoom}
      className="flex w-dvw flex-row items-center justify-between px-7 py-5 active:bg-accent-foreground"
    >
      <div className="flex w-[85%] flex-row items-center gap-5">
        <div className="relative">
          <CircleProfileImg
            size="size-[50px]"
            profileImgUrl={
              profileImgUrl
                ? convertImgSrcToHTTPS(profileImgUrl)
                : '/src/assets/weatherImage/placeholder.jpg'
            }
          />
          {isOnline && username != '탈퇴한 사용자' && (
            <div className="absolute bottom-0 right-0 size-4 rounded-full bg-green-500"></div>
          )}
        </div>
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
            <p> · </p>
            <p className="text-nowrap">{updatedDate}</p>
          </div>
        </div>
      </div>

      {/* 읽지 않은 메시지인 경우 우측에 표시 */}
      {!read && <div className="size-3 rounded-full bg-accent"></div>}
    </div>
  );
};

export default ChatItem;
