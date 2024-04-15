import BackBtnHeader from '@/components/BackBtnHeader';
import ProfileHeader, {
  ProfileHeaderSkeleton,
} from './components/ProfileHeader';
import ProfileFeedList from './components/ProfileFeedList';
import {
  deleteAccount,
  getLogout,
  getProfileUserData,
} from './services/profileApi';
import useAuthStore from '@/store/useAuthStore';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { ProfileEditSheet } from './components/profileDrawer';
import { getUserDetails } from '../Posts/services/getUserDetails';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { MoreOutline } from 'antd-mobile-icons';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const MyProfilePage = () => {
  const { user } = useAuthStore();
  const userId = user?.userId;
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isEtcSheetOpen, setIsEtcSheetOpen] = useState(false);
  const [showExitForm, setShowExitForm] = useState(false);
  const [password, setPassword] = useState<string>();
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

  const handleDeleteAccount = async () => {
    if (!password) toast.error('탈퇴를 위해 비밀번호를 입력해주세요.');
    if (user && password) {
      try {
        const response = await deleteAccount(
          user?.userName,
          user?.email,
          password,
        );

        if (response.status === 200) {
          toast.success('서비스 탈퇴 완료', {
            description:
              '복구를 대비해 계정 정보는 30일 보관 후 완전히 삭제됩니다.',
            duration: 10000,
          });

          navigate('/hello');
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.status === 400) {
          toast.error('탈퇴 처리 실패', {
            description: '입력하신 비밀번호가 일치하지 않습니다.',
          });
        }
        console.log(error);
      }
    }
  };

  const handleCloseEditSheet = () => {
    setIsEditSheetOpen(false);
  };

  const handleCloseEtcSheet = () => {
    setIsEtcSheetOpen(false);
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
    <div className="flex h-[calc(100dvh-80px)] flex-col gap-1 overflow-y-scroll">
      <BackBtnHeader title="내 프로필" />
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
      <BottomSheet
        open={isEtcSheetOpen}
        onDismiss={handleCloseEtcSheet}
        snapPoints={({ maxHeight }) =>
          showExitForm ? [maxHeight * 0.4] : [maxHeight * 0.15]
        }
      >
        <div
          onClick={() => setShowExitForm(!showExitForm)}
          className="inline-flex h-[60px] w-full items-center px-7 py-2"
        >
          <p className="border-b-primary-foreground/40 w-full border-b pb-2 text-lg font-semibold">
            🚪 회원 탈퇴
          </p>
        </div>
        {showExitForm && (
          <div className="flex w-full flex-col justify-center gap-4 px-7 pt-1">
            <p className="text-lg">🥺 정말 계정을 삭제하시겠어요?</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요..."
              className="border-b border-b-black p-1 text-base focus:outline-none"
            />
            <div className="inline-flex justify-end gap-2">
              <Button onClick={handleDeleteAccount} variant="secondary">
                네 탈퇴 할게요...
              </Button>
              <Button onClick={() => setIsEtcSheetOpen(false)} variant="accent">
                탈퇴는 안할래요!
              </Button>
            </div>
          </div>
        )}
      </BottomSheet>
      <div className="flex items-center justify-center gap-2 px-6">
        <Button variant="secondary" onClick={handleEdit} className="h-8 w-3/5">
          내 정보 수정
        </Button>
        <Button
          onClick={handleLogOut}
          variant="secondary"
          className="h-8 w-1/3"
        >
          로그아웃
        </Button>
        <Button
          onClick={() => setIsEtcSheetOpen(true)}
          variant="secondary"
          className="h-8 p-2"
        >
          <MoreOutline fontSize={24} />
        </Button>
      </div>
      {userData && <ProfileFeedList userId={String(userId)} />}
    </div>
  );
};

export default MyProfilePage;
