import BackBtnHeader from '@/components/BackBtnHeader';
import ProfileHeader, {
  ProfileHeaderSkeleton,
} from './components/ProfileHeader';
import ProfileFeedList from './components/ProfileFeedList';
import { getLogout, getProfileUserData } from './services/profileApi';
import useAuthStore from '@/store/useAuthStore';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { ProfileEditSheet } from './components/profileDrawer';
import { getUserDetails } from '../Posts/services/getUserDetails';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const MyProfilePage = () => {
  const { user } = useAuthStore();
  const userId = user?.userId;
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data: userInfo,
    refetch: refetchProfileData,
    isLoading,
  } = useQuery({
    queryKey: ['userDetails'],
    queryFn: getUserDetails,
  });
  const { data: userData, refetch: refetchProfileHeader } = useQuery({
    queryKey: ['userProfileData', userId],
    queryFn: () => getProfileUserData(String(userId)),
    enabled: !!userId,
  });

  const handleEdit = () => {
    setIsEditSheetOpen(true);
  };

  const handleLogOut = async () => {
    await getLogout();
    await navigate('/hello');
  };

  const handleCloseEditSheet = () => {
    setIsEditSheetOpen(false);
  };

  const refetchData = () => {
    refetchProfileData();
    refetchProfileHeader();
  };

  if (isLoading || !userData) {
    return (
      <div className="flex h-[100dvh-183px] flex-1 flex-col overflow-y-scroll">
        <BackBtnHeader title="My Profile" />
        <ProfileHeaderSkeleton />
        <Skeleton className=" mb-3 ml-8 h-8 w-1/12 rounded-md font-bold text-secondary-foreground" />
        <div className="flex items-center justify-center gap-7">
          <Skeleton className="h-8 w-5/12 rounded-md font-bold text-secondary-foreground" />
          <Skeleton className="h-8 w-5/12 rounded-md font-bold text-secondary-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh-183px] flex-1 flex-col overflow-y-scroll">
      <BackBtnHeader title="My Profile" />
      {userData && <ProfileHeader userProfileData={userData.results} />}
      <BottomSheet
        open={isEditSheetOpen}
        onDismiss={handleCloseEditSheet}
        snapPoints={({ maxHeight }) => [maxHeight * 0.9]}
      >
        {userInfo && (
          <ProfileEditSheet
            userInfo={userInfo.results}
            onClose={handleCloseEditSheet}
            onUpdateSuccess={refetchData}
          />
        )}
      </BottomSheet>
      <div className="flex items-center justify-center gap-7">
        <button
          onClick={handleEdit}
          className="h-8 w-5/12 rounded-md bg-accent font-bold text-secondary-foreground"
        >
          프로필 변경
        </button>

        <button
          onClick={handleLogOut}
          className="h-8 w-5/12 rounded-md bg-accent font-bold text-secondary-foreground"
        >
          로그아웃
        </button>
      </div>
      {userData && <ProfileFeedList userId={String(userId)} />}
    </div>
  );
};

export default MyProfilePage;
