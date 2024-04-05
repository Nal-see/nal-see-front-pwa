import BackBtnHeader from '@/components/BackBtnHeader';
import { getToken } from 'firebase/messaging';
import { messaging } from 'services/fcm/firebase-config';
import { postFCMToken } from '@/services/api/auth.service';

const NotificationsPage = () => {
  const notificationPermission = async () => {
    Notification.requestPermission().then(async (permission) => {
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });

        if (token) {
          console.log('fcm client token!', token);
          const sendToken = await postFCMToken(token);

          if (sendToken.status === 200) {
            console.log('서버 DB에 FCM Token 저장 성공');
          }
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          );
        }
      }
    });
  };
  return (
    <div className="flex-1">
      <BackBtnHeader title="알림" />
      <button onClick={notificationPermission}>알림 설정하기</button>
    </div>
  );
};

export default NotificationsPage;
