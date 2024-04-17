import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getMessaging, onMessage } from 'firebase/messaging';
import { useNotificationStore } from '@/store/useNotificationStore';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

// foreground message 처리
onMessage(messaging, () => {
  const { setNewNotification } = useNotificationStore();
  setNewNotification(true);
});
