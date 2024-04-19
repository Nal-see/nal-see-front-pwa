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
import { getFollowerList, getFollowingList } from '../services/profileApi';
import { Button } from '@/components/ui/button';

type FeedCountProp = {
  count: string | number;
  counterName: string;
  userId: string | null;
};

interface User {
  userId: string;
  username: string;
  picture: string;
  isFollowd: boolean;
}

const FeedCount: React.FC<FeedCountProp> = ({ count, counterName, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  console.log('userId: 카운트에있는거 ', userId);

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
    console.log('handleGetFollowList');
    getFollowList(counterName);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <p className="text-base font-bold" onClick={handleGetFollowList}>
            {count}
          </p>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
                  className="flex items-center justify-around space-x-4"
                >
                  <div className="flex items-center gap-4">
                    <CircleProfileImg
                      profileImgUrl={user.picture}
                      size="size-10"
                    />
                    <p className="text-base font-medium leading-none">
                      {user.username}
                    </p>
                  </div>
                  <Button
                    className={`${false ? `bg-accent text-slate-50` : `bg-secondary-foreground text-black`}`}
                  >
                    {`${false ? '팔로우' : '팔로잉'}`}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
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
