import BackBtnHeader from '@/components/BackBtnHeader';
import NotificationItem from './components/NotificationItem';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

const NotificationsPage = () => {
  const { data } = useQuery({
    queryKey: ['notificationList'],
    queryFn: () => api.get('/notification'),
  });
  console.log(data);
  return (
    <div className="flex-1">
      <BackBtnHeader title="알림" />
      {data &&
        data.data.results.map((item, idx) => (
          <NotificationItem
            key={`${idx}-${item.senderId}`}
            notification={item}
          />
        ))}
    </div>
  );
};

export default NotificationsPage;
