import BackBtnHeader from '@/components/BackBtnHeader';
import NotificationItem from './components/NotificationItem';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { INotificationData } from '@/types/notifications';
import { useEffect, useState } from 'react';
import { useNotificationStore } from '@/store/useNotificationStore';

const NotificationsPage = () => {
  const { setNewNotification } = useNotificationStore();
  const [notificationList, setNotificationList] =
    useState<INotificationData[]>();

  const { data } = useQuery({
    queryKey: ['notificationList'],
    queryFn: () => api.get('/notification'),
  });

  useEffect(() => {
    setNewNotification(false);
  }, []);

  useEffect(() => {
    if (data?.data.results.length) {
      const newList = data.data.results;
      // 알림 목록 최신순으로 정렬
      newList.sort(
        (a: INotificationData, b: INotificationData) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
      );
      setNotificationList(newList);
    }
  }, [data]);

  return (
    <div className="flex-1">
      <BackBtnHeader title="알림" />
      <div className="h-[calc(100dvh-152px)] overflow-y-scroll scrollbar-hide">
        {notificationList?.length &&
          notificationList.map((item: INotificationData, idx: number) => (
            <NotificationItem
              key={`${idx}-${item.senderId}`}
              notification={item}
            />
          ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
