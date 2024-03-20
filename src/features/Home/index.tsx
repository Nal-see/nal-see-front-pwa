import useAuthStore from '@/store/useAuthStore';

const HomePage = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div>유저 정보가 없습니다.</div>;
  }
  const { userId, userName, email, isNewUser } = user;
  return (
    <div className="flex-1 bg-purple-50">
      <p className="text-accent">나는 홈페이지 입니다.</p>
      <p>userId: {userId}</p>
      <p>userName: {userName}</p>
      <p>email: {email}</p>
      <p>isNewUser: {isNewUser ? 'true' : 'false'}</p>
    </div>
  );
};

export default HomePage;
