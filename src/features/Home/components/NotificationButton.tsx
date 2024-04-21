import { NotificationIcon, NotificationWithBadgeIcon } from '@/components/Icon';
import { useNotificationStore } from '@/store/useNotificationStore';
import { useNavigate } from 'react-router-dom';

const NotificationButton = () => {
  const navigate = useNavigate();
  const { newNotification } = useNotificationStore();

  return (
    <div className="absolute bottom-3 right-3 z-[3]">
      <button onClick={() => navigate('/notifications')}>
        {newNotification ? (
          <NotificationWithBadgeIcon className="size-[50px]" />
        ) : (
          <NotificationIcon className="size-[50px]" />
        )}
      </button>
    </div>
  );
};

export default NotificationButton;
