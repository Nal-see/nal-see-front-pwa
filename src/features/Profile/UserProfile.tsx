import BackBtnHeader from '@/components/BackBtnHeader';
import ProfileFeedList from './components/ProfileFeedList';
import ProfileHeader from './components/ProfileHeader';
import { useState, useEffect } from 'react';
import { getProfileUserData } from './services/profileApi';
import { useParams } from 'react-router-dom';
import FollowMesgComp from './components/FollowMesgComp';
import { UserProfilePageProps } from '@/types/profile';
import { useQuery } from '@tanstack/react-query';

const UserProfilePage = () => {
  const userId = useParams().userId;
  console.log('userId: ', userId);

  const [userData, setUserData] = useState<UserProfilePageProps | null>(null);

  const { data, refetch } = useQuery({
    queryKey: ['userProfileInfo', userId],
    queryFn: () => {
      return getProfileUserData(String(userId));
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setUserData(data.results);
    }
  }, [data, userId]);

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
        onSuccess={refetch}
      />
      <ProfileFeedList userId={String(userId)} />
    </div>
  );
};

export default UserProfilePage;
