import { NotificationIcon, NotificationWithBadgeIcon } from '@/components/Icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationButton = () => {
  const navigate = useNavigate();
  const [hasNewNotification, setHasNewNotification] = useState(true);

  return (
    <div className="absolute bottom-[90px] right-3 z-10">
      <button onClick={() => navigate('/notifications')}>
        {hasNewNotification ? (
          <NotificationWithBadgeIcon className="size-[75px]" />
        ) : (
          <NotificationIcon className="size-[75px]" />
        )}
      </button>
    </div>
  );
};

export default NotificationButton;
