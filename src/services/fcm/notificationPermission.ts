import { getToken } from 'firebase/messaging';
import { messaging } from './firebase-config';
import { postFCMToken } from '../api/auth.service';
import { registerFcmServiceWorker } from './registerFcmServiceWorker';

export const handleAllowNotification = async () => {
  //FCM 서비스워커 등록
  registerFcmServiceWorker();

  // 알림 권한 요청 및 FCM 토큰 발급, 서버에 POST
  try {
    const permission = await Notification.requestPermission();

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
    } else if (permission === 'denied') {
      console.log('브라우저 알림 권한 차단됨');
    }
  } catch (error) {
    console.log('fcm 토큰 발급 오류', error);
  }
};
