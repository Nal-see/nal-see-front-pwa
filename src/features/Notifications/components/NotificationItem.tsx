import { useNavigate } from 'react-router-dom';

interface INotificationItemProps {
  notification: {
    message: string;
    senderId: number;
    senderImage: string;
    senderName: string;
    postId: number | null;
    commentId: number | null;
    userId: number | null;
  };
}

const NotificationItem = ({ notification }: INotificationItemProps) => {
  const navigate = useNavigate();

  const navigateToTarget = () => {
    navigate(`/`);
  };

  return (
    <div
      onClick={navigateToTarget}
      className="inline-flex w-dvw items-center justify-start gap-3 px-7 py-3"
    >
      <img
        src={notification.senderImage}
        className="size-[40px] rounded-full object-cover"
      />
      <p className="line-clamp-2 w-[70%]">{notification.message}</p>
      {/* <p className="font-primary-foreground">1m</p> */}
    </div>
  );
};

export default NotificationItem;
