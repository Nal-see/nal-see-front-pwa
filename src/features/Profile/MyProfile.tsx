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
import { Switch } from '@/components/ui/switch';
import {
  getNotificationStatus,
  unregisterFirebaseSW,
} from '../Notifications/utils/notificationUtils';
import { handleAllowNotification } from '@/services/fcm/notificationPermission';

const MyProfilePage = () => {
  const { user } = useAuthStore();
  const userId = user?.userId;
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isEtcSheetOpen, setIsEtcSheetOpen] = useState(false);
  const [showExitForm, setShowExitForm] = useState(false);
  const [email, setEmail] = useState<string>();
  const navigate = useNavigate();

  const {
    data: userInfo,
    refetch: refetchProfileData,
    isLoading,
    isError,
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
    if (!email)
      toast.error('본인 확인을 위해 카카오계정 이메일을 입력해주세요.');
    if (user && email) {
      try {
        const response = await deleteAccount(user?.userName, email);

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
        if (err.response?.status === 400) {
          toast.error('탈퇴 처리 실패', {
            description:
              '입력하신 카카오 이메일이 회원정보와 일치하지 않습니다.',
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
    setShowExitForm(false);
    setEmail('');
  };

  const refetchData = () => {
    refetchProfileData();
    refetchProfileHeader();
  };

  if (isError && !userData) {
    toast('세션 만료', {
      description:
        '세션이 만료되어 데이터를 불러올 수 없습니다. 다시 로그인하시겠어요?',
      action: {
        label: '로그인',
        onClick: () => window.location.reload(),
      },
      actionButtonStyle: {
        background: 'var(--accent)',
      },
      duration: 10000,
    });
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100dvh-80px)] flex-col overflow-y-scroll">
        <BackBtnHeader title="내 프로필" />
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
          showExitForm ? [maxHeight * 0.45] : [maxHeight * 0.25]
        }
      >
        <div className="border-b-primary-foreground/40 inline-flex h-[60px] w-full items-center justify-center border-b px-7 py-2">
          <p className="w-full py-2 text-lg font-medium">🛎️ 알림 설정</p>
          <Switch
            defaultChecked={getNotificationStatus()}
            onCheckedChange={(checked) => {
              if (checked) {
                handleAllowNotification();
              } else {
                unregisterFirebaseSW();
              }
            }}
          />
        </div>
        <div className="border-b-primary-foreground/40 flex w-full flex-col items-center border-b px-7 py-2">
          <p
            onClick={() => setShowExitForm(!showExitForm)}
            className={`w-full py-2 text-lg font-medium ${showExitForm ? '' : ''}`}
          >
            🚪 회원 탈퇴
          </p>
          {showExitForm && (
            <div className="flex w-full flex-col justify-center gap-3">
              <p className="text-sm font-light">
                🥺 정말 이 계정을 삭제하시겠어요?
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="카카오 계정 이메일 주소를 입력해주세요"
                className="border-b border-b-black p-1 text-base font-semibold focus:outline-none"
              />
              <div className="inline-flex justify-end gap-2">
                <Button onClick={handleDeleteAccount} variant="secondary">
                  네 탈퇴 할게요...
                </Button>
                <Button onClick={handleCloseEtcSheet} variant="accent">
                  탈퇴는 안할래요!
                </Button>
              </div>
            </div>
          )}
        </div>
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
