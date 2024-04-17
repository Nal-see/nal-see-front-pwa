import { toast } from 'sonner';

export const getNotificationStatus = (): boolean => {
  if ('Notification' in window) {
    console.log('notification status', Notification.permission === 'granted');
    return Notification.permission === 'granted';
  } else if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker
      .getRegistration('/firebase-messaging-sw.js')
      .then((registration) => {
        if (!registration) return false;
        else return registration.active;
      });

    return false;
  } else {
    return false;
  }
};

export const unregisterFirebaseSW = (): void => {
  if ('Notification' in window) {
    toast.info('알림 해제 1단계 완료', {
      description:
        '기기 브라우저의 설정에서 알림 권한을 해제해주세요. 그렇지 않으면 알림이 완벽히 해제되지 않아요!',
      duration: 10000,
    });
  }
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker
      .getRegistration('/firebase-messaging-sw.js')
      .then((registration) => {
        if (registration)
          registration.unregister().then((success) => {
            if (success) console.log('serviceWorker unregister 성공');
            else console.log('serviceWorker unregister 실패');
          });
        else console.log('등록된 serviceWorker 없음');
      });
  }
};
