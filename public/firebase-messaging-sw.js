function isSamsungDevice() {
  const ua = navigator.userAgent;
  return /Samsung|SM-/.test(ua);
}

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
  const unreadCount = resultData.unreadCount;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: isSamsungDevice() ? '/icon-192x192.png' : '/apple-touch-icon.png',
    badge: '/src/assets/nalsee-white.png',
    vibrate: [200, 100, 200],
    tag: resultData.tag,
    ...resultData,
  };

  if (navigator.setAppBadge) {
    if (unreadCount && unreadCount > 0) navigator.setAppBadge(unreadCount);
    else navigator.clearAppBadge();
  }

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  const url = '/';
  // const url = `/feeds/${event.notification.id}`;
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
