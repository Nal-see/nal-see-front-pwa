import BackBtnHeader from '@/components/BackBtnHeader';
import ProfileFeedList from './components/ProfileFeedList';
import ProfileHeader from './components/ProfileHeader';
import { useState, useEffect } from 'react';
import { getProfileUserData } from './services/profileApi';
import { useParams } from 'react-router-dom';
import FollowMesgComp from './components/FollowMesgComp';
import { UserProfilePageProps } from '@/types/profile';

const UserProfilePage = () => {
  const userId = useParams().userId;
  console.log('userId: ', userId);

  const [userData, setUserData] = useState<UserProfilePageProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const response = await getProfileUserData(userId);
        console.log('response: ', response);
        setUserData(response.results); // fetched 데이터를 상태에 저장
      }
    };

    fetchData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-dvh overflow-y-scroll">
      <BackBtnHeader title={userData.username} />
      <ProfileHeader userProfileData={userData} />
      <FollowMesgComp
        userId={String(userId)}
        isFollowed={userData.isFollowed}
      />
      <ProfileFeedList userId={String(userId)} />
    </div>
  );
};

export default UserProfilePage;
