import { Skeleton } from '@/components/ui/skeleton';
import React, { useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CircleProfileImg from '@/components/CircleProfileImg';
import {
  followUser,
  getFollowerList,
  getFollowingList,
  unFollowUser,
} from '../services/profileApi';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { convertImgSrcToHTTPS } from '@/lib/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type FeedCountProp = {
  count: string | number;
  counterName: string;
  userId: string | null;
  isFeedCount: boolean;
};

interface User {
  userId: string;
  username: string;
  picture: string;
  isFollowed?: boolean;
}

const FeedCount: React.FC<FeedCountProp> = ({
  count,
  counterName,
  userId,
  isFeedCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const getFollowList = useCallback(
    async (type: string) => {
      if (!userId) return;
      if (type === '팔로워') {
        setIsOpen(true);
        const followerUsers = await getFollowerList(userId);
        setUsers(followerUsers.results);
      } else if (type === '팔로잉') {
        setIsOpen(true);
        const followingUsers = await getFollowingList(userId);
        setUsers(followingUsers.results);
      }
    },
    [userId],
  );

  const handleGetFollowList = () => {
    getFollowList(counterName);
  };

  const moveProfile = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const queryClient = useQueryClient();

  const FollowMutation = useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: (_, userId) => {
      console.log('followed success');
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, isFollowed: true } : user,
        ),
      );
      queryClient.invalidateQueries(['userProfileData', userId] as any);
    },
    onError: () => {
      console.log('followed failed');
    },
  });

  const UnFollowMutation = useMutation({
    mutationFn: (userId: string) => unFollowUser(userId),
    onSuccess: (_, userId) => {
      console.log('unfollowed success');
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, isFollowed: false } : user,
        ),
      );
      queryClient.invalidateQueries(['userProfileData', userId] as any);
    },
    onError: () => {
      console.log('unfollowed failed');
    },
  });

  const handleFollow = (userId: string) => {
    const isFollowed = users.find((user) => user.userId === userId)?.isFollowed;
    if (isFollowed) {
      UnFollowMutation.mutate(userId);
    } else {
      FollowMutation.mutate(userId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isFeedCount ? (
        <p className="text-base font-bold" onClick={handleGetFollowList}>
          {count}
        </p>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <p className="text-base font-bold" onClick={handleGetFollowList}>
              {count}
            </p>
          </DialogTrigger>
          <DialogContent className="max-w-[350px]">
            <DialogHeader>
              <DialogTitle>{counterName} 목록</DialogTitle>
            </DialogHeader>
            {users.length === 0 ? (
              <div className="mt-4 space-y-4">
                {/* 로딩 중일 때 보여줄 Skeleton 컴포넌트 */}
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="size-10 rounded-full" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {users.map((user) => (
                  <div
                    key={user.userId}
                    className="flex items-center justify-between space-x-4"
                  >
                    <div
                      className="flex items-center gap-4"
                      onClick={() => moveProfile(user.userId)}
                    >
                      <CircleProfileImg
                        profileImgUrl={convertImgSrcToHTTPS(user.picture)}
                        size="size-10"
                      />
                      <p className="text-base font-medium leading-none">
                        {user.username}
                      </p>
                    </div>
                    {/* {userId == myId ? ( */}
                    <Button
                      onClick={() => handleFollow(user.userId)}
                      className={`${
                        !user.isFollowed
                          ? 'bg-accent text-slate-50'
                          : 'bg-secondary-foreground text-black'
                      }`}
                    >
                      {`${!user.isFollowed ? '팔로우' : '팔로잉'}`}
                    </Button>
                    {/* ) : null} */}
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
      <h3 className="text-base">{counterName}</h3>
    </div>
  );
};

export default FeedCount;

export const FeedCountSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Skeleton className="h-8 w-5" />
      <Skeleton className="h-8 w-20" />
    </div>
  );
};
