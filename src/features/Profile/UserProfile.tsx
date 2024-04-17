import BackBtnHeader from '@/components/BackBtnHeader';
import ProfileFeedList from './components/ProfileFeedList';
import ProfileHeader, {
  ProfileHeaderSkeleton,
} from './components/ProfileHeader';
import { useState, useEffect } from 'react';
import { getProfileUserData } from './services/profileApi';
import { useParams } from 'react-router-dom';
import FollowMesgComp from './components/FollowMesgComp';
import { UserProfilePageProps } from '@/types/profile';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileFeedListSkeleton = () => {
  return (
    <div>
      <div className="mt-4 border-t-2">
        <div className="flex flex-wrap">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-1/3 p-1">
              <Skeleton className="h-[200px] w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UserProfilePage = () => {
  const userId = useParams().userId;
  console.log('userId: ', userId);

  const [userData, setUserData] = useState<UserProfilePageProps | null>(null);

  const { data, refetch, isLoading } = useQuery({
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

  if (isLoading) {
    return (
      <div>
        <div className="flex h-[100dvh-183px] flex-1 flex-col overflow-y-scroll">
          <BackBtnHeader title="My Profile" />
          <ProfileHeaderSkeleton />
          <Skeleton className=" mb-3 ml-8 h-8 w-1/12 rounded-md font-bold text-secondary-foreground" />
          <div className="flex items-center justify-center gap-7">
            <Skeleton className="h-8 w-5/12 rounded-md font-bold text-secondary-foreground" />
            <Skeleton className="h-8 w-5/12 rounded-md font-bold text-secondary-foreground" />
          </div>
        </div>
        <div className="h-dvh overflow-y-scroll">
          <ProfileFeedListSkeleton />
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="h-dvh">
      <BackBtnHeader title={userData.username} />
      <div className="h-[calc(100dvh-136px)] overflow-y-scroll scrollbar-hide">
        <ProfileHeader userProfileData={userData} />
        <FollowMesgComp
          userId={String(userId)}
          isFollowed={userData.isFollowed}
          onSuccess={refetch}
        />
        <ProfileFeedList userId={String(userId)} />
      </div>
    </div>
  );
};

export default UserProfilePage;
