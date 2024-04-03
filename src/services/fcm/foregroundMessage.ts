import { onMessage } from 'firebase/messaging';
import { messaging } from './firebase-config';

onMessage(messaging, (payload) => {
  console.log('알림 도착!', payload);
  if (payload.notification) {
    const notificationTitle = payload.notification.title!;
    const notificationOptions = {
      body: payload.notification.body,
    };

    if (Notification.permission === 'granted') {
      new Notification(notificationTitle, notificationOptions);
    }
  }
});
