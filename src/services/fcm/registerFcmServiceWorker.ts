export const registerFcmServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('FCM Service worker 등록 완료, scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service worker 등록 실패: ', error);
      });
  }
};
