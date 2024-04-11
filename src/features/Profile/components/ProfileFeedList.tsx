import { useInfiniteQuery } from '@tanstack/react-query';
import FeedItem from './FeedItem';
import { getProfileFeed } from '../services/profileApi';
import { ProfileFeedData } from '@/types/profile';
import useAuthStore from '@/store/useAuthStore';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import EmptyPage from '@/components/EmptyPage';
import { SyncLoader } from 'react-spinners';

const ProfileFeedList = ({ userId }: { userId: string | number }) => {
  const { user } = useAuthStore();
  userId = userId ? userId : Number(user?.userId);
  const isMyProfile = user?.userId === userId;
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ProfileFeedData>({
      queryKey: ['profileFeed'],
      queryFn: ({ pageParam = -1 }) =>
        getProfileFeed({ userId, lastPostId: Number(pageParam) }),
      getNextPageParam: (lastPage) => {
        const lastPostId = lastPage.results[lastPage.results.length - 1];
        return lastPostId ? lastPostId.postId : undefined;
      },
      initialPageParam: undefined,
    });

  const feedList = data?.pages.flatMap((page) => page.results) || [];

  const [ref, inView] = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (feedList.length === 0 && isMyProfile) {
    return <EmptyPage />;
  }
  return (
    <div className="mt-4 border-t-2">
      <div className="flex flex-wrap overflow-y-scroll scrollbar-hide">
        {feedList.map((feed) => (
          <div key={feed.postId} className="w-1/3 ">
            <FeedItem item={feed} />
          </div>
        ))}
      </div>
      {isFetchingNextPage && <SyncLoader color="#3ba5ff" />}
      <div ref={ref} />
    </div>
  );
};

export default ProfileFeedList;
