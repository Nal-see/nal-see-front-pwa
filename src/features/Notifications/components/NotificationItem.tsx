import { useNavigate } from 'react-router-dom';

const NotificationItem = () => {
  const navigate = useNavigate();

  const navigateToTarget = () => {
    navigate(`/`);
  };

  return (
    <div
      onClick={navigateToTarget}
      className="inline-flex w-dvw items-center justify-start gap-3 px-7 py-3"
    >
      <img
        src="/icon-32x32.png"
        className="size-[40px] rounded-full object-cover"
      />
      <p className="line-clamp-2 w-[70%]">홍길동 님이 게시물을 좋아합니다.</p>
      <p className="font-primary-foreground">1m</p>
    </div>
  );
};

export default NotificationItem;
