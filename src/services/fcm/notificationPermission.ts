import { getToken } from 'firebase/messaging';
import { messaging } from './firebase-config';
import { registerFcmServiceWorker } from './registerFcmServiceWorker';

export const handleAllowNotification = async () => {
  registerFcmServiceWorker();
  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      if (token) {
        console.log('token!', token);
        localStorage.setItem('fcmToken', token);
      } else {
        console.log(
          'No registration token available. Request permission to generate one.',
        );
      }
    } else if (permission === 'denied') {
      console.log('wep push 권한 차단됨');
    }
  } catch (error) {
    console.log('fcm 토큰 발급 오류', error);
  }
};
