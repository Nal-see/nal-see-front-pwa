import { handleAllowNotification } from '@/services/fcm/notificationPermission';
import { toast } from 'sonner';

const ToastNotiPermission = () => {
  if ('Notification' in window) {
    if (Notification.permission !== 'granted') {
      toast('👀 알림을 설정하시겠어요?', {
        description:
          '푸쉬 알림 설정으로 좋아요, 댓글 및 팔로우 알림을 실시간으로 받아보세요.',
        duration: 10000,
        action: {
          label: '알림 받기',
          onClick: () => handleAllowNotification(),
        },
        style: {
          background: 'var(--accent-foreground',
        },
        actionButtonStyle: {
          background: 'var(--accent)',
        },
      });
    }
  }

  return <></>;
};

export default ToastNotiPermission;
