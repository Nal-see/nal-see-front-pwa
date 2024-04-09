import BackBtnHeader from '@/components/BackBtnHeader';
import ProfileHeader from './components/ProfileHeader';
import ProfileFeedList from './components/ProfileFeedList';
import { getProfileUserData } from './services/profileApi';
import useAuthStore from '@/store/useAuthStore';
import { useState } from 'react';
import EmptyPage from '@/components/EmptyPage';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { ProfileEditSheet } from './components/profileDrawer';
import { getUserDetails } from '../Posts/services/getUserDetails';
import { useQuery } from '@tanstack/react-query';

const MyProfilePage = () => {
  const { user } = useAuthStore();
  const userId = user?.userId;
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const { data: userInfo, refetch: refetchProfileData } = useQuery({
    queryKey: ['userDetails'],
    queryFn: getUserDetails,
  });
  const { data: userData, refetch: refetchProfileHeader } = useQuery({
    queryKey: ['userProfileData', userId],
    queryFn: () => getProfileUserData(String(userId)),
    enabled: !!userId,
  });

  if (!userData) {
    return <EmptyPage />;
  }

  const handleEdit = () => {
    setIsEditSheetOpen(true);
  };

  const handleCloseEditSheet = () => {
    setIsEditSheetOpen(false);
  };

  const refetchData = () => {
    refetchProfileData();
    refetchProfileHeader();
  };
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
      <button
        onClick={handleEdit}
        className="mx-auto h-8 w-11/12 bg-accent font-bold text-secondary-foreground"
      />
      {userData && <ProfileFeedList userId={String(userId)} />}
    </div>
  );
};

export default MyProfilePage;
