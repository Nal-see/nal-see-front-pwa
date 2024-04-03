export const registerFcmServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service worker 등록 완료, scope:', registration.scope);
        })
        .catch((error) => {
          console.log('Service worker 등록 실패: ', error);
        });
    });
  }
};
