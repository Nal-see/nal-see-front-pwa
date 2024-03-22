import { useInfiniteQuery } from '@tanstack/react-query';
import FeedItem from './FeedItem';
import { getProfileFeed } from '../services/profileApi';
import { ProfileFeedData } from '@/types/profile';
import useAuthStore from '@/store/useAuthStore';
import { useInView } from 'react-intersection-observer';
import React from 'react';

const ProfileFeedList = () => {
  const { user } = useAuthStore();
  const userId = user?.userId;
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ProfileFeedData>({
      queryKey: ['profileFeed'],
      queryFn: ({ pageParam = -1 }) =>
        getProfileFeed({ userId, lastPostId: pageParam }),
      getNextPageParam: (lastPage) => {
        const lastPostId = lastPage.results[lastPage.results.length - 1];
        return lastPostId ? lastPostId.postId : undefined;
      },
      initialPageParam: undefined,
    });

  const feedList = data?.pages.flatMap((page) => page.results) || [];
  console.log('feedList: ', feedList);

  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: '00px',
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      <div className="flex flex-wrap overflow-y-scroll scrollbar-hide">
        {feedList.map((feed) => (
          <div key={feed.postId} className="w-1/3">
            <FeedItem item={feed} />
          </div>
        ))}
      </div>
      {isFetchingNextPage && <div>Loading...</div>}
      <div ref={ref} />
    </div>
  );
};

export default ProfileFeedList;
