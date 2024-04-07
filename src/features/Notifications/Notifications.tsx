import BackBtnHeader from '@/components/BackBtnHeader';
import NotificationItem from './components/NotificationItem';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

const NotificationsPage = () => {
  const { data } = useQuery({
    queryKey: ['notificationList'],
    queryFn: () => api.get('/notification'),
  });

  return (
    <div className="flex-1">
      <BackBtnHeader title="알림" />
      <NotificationItem />
    </div>
  );
};

export default NotificationsPage;
