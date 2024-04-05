self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate...');
});

self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  console.log('self push event', e.data.json().notification);
  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: '/apple-touch-icon.png',
    badge: '/apple-touch-icon.png',
    vibrate: [200, 100, 200],
    tag: resultData.tag,
    ...resultData,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  const url = '/';
  // const url = `/feeds/${event.notification.id}`;
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
