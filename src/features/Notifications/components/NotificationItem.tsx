import { api } from '@/lib/api';
import { convertImgSrcToHTTPS, formatNotificationDate } from '@/lib/helpers';
import { INotificationItemProps } from '@/types/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const NotificationItem = ({ notification }: INotificationItemProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (notificationId: number) =>
      api.post(`/notification/${notificationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationList'] });
    },
    onError: (err) => console.error('notification post error', err),
    onMutate: () => {
      //알림 유형에 따라 클릭시 게시물 또는 유저 프로필로 이동
      if (notification.postId) {
        navigate(`/feeds/${notification.postId}`);
      } else if (notification.userId) {
        navigate(`/user/${notification.userId}`);
      }
    },
  });

  return (
    <div
      onClick={() => {
        if (!notification.isRead) mutate(notification.id);
      }}
      className="inline-flex w-dvw items-center justify-between px-8 py-3"
    >
      <div
        onClick={() => navigate(`/user/${notification.senderId}`)}
        className="inline-flex items-center gap-3"
      >
        <img
          src={convertImgSrcToHTTPS(notification.senderImage)}
          className="size-[40px] rounded-full object-cover"
        />
        <p
          className={`line-clamp-2 ${!notification.isRead && 'font-semibold'}`}
        >
          {notification.message}
        </p>
      </div>

      <p className="text-right text-primary-foreground">
        {formatNotificationDate(notification.createAt)}
      </p>
    </div>
  );
};

export default NotificationItem;
