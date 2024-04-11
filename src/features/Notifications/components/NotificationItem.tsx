import { formatNotificationDate } from '@/lib/helpers';
import { INotificationItemProps } from '@/types/notifications';
import { useNavigate } from 'react-router-dom';

const NotificationItem = ({ notification }: INotificationItemProps) => {
  const navigate = useNavigate();

  const navigateToTarget = () => {
    //알림 유형에 따라 클릭시 게시물 또는 유저 프로필로 이동
    if (notification.postId) {
      navigate(`/feeds/${notification.postId}`);
    } else if (notification.userId) {
      navigate(`/user/${notification.userId}`);
    }
  };

  return (
    <div
      onClick={navigateToTarget}
      className="inline-flex w-dvw items-center justify-between px-8 py-3"
    >
      <div className="inline-flex items-center gap-3">
        <img
          src={notification.senderImage}
          className="size-[40px] rounded-full object-cover"
        />
        <p className="line-clamp-2">{notification.message}</p>
      </div>

      <p className="text-right text-primary-foreground">
        {formatNotificationDate(notification.createAt)}
      </p>
    </div>
  );
};

export default NotificationItem;
