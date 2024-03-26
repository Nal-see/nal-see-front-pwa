import BackBtnHeader from '@/components/BackBtnHeader';
import ProfileHeader from './components/ProfileHeader';
import ProfileFeedList from './components/ProfileFeedList';
import { getProfileUserData } from './services/profileApi';
import useAuthStore from '@/store/useAuthStore';
import { useEffect, useState } from 'react';
import { UserProfilePageProps } from '@/types/profile';

const MyProfilePage = () => {
  const { user } = useAuthStore();
  const userId = user?.userId;

  const [userData, setUserData] = useState<UserProfilePageProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const response = await getProfileUserData(userId);
        setUserData(response.results); // fetched 데이터를 상태에 저장
      }
    };

    fetchData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[100dvh-183px] flex-1 overflow-y-scroll">
      <BackBtnHeader title="My Profile" />
      <ProfileHeader userProfileData={userData} />
      <ProfileFeedList />
    </div>
  );
};

export default MyProfilePage;
