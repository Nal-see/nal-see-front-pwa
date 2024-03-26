import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { getFeedList } from '../services/feedApi';
import { Feed } from '@/types/feed';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import FeedSkeletonCard from './FeedCard/FeedSkeletionCard';
import FeedListCard from './FeedCard/FeedCard';

const FeedList = () => {
  const { longtitude, latitude, errorMsg } = useCurrentLocation();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<Feed[], string[]>({
      queryKey: ['feedList'],
      queryFn: async ({ pageParam = -1 }) => {
        const response = await getFeedList(
          pageParam as number,
          longtitude as number,
          latitude as number,
        );
        return response;
      },
      getNextPageParam: (lastPage) => {
        const lastFeed = lastPage[lastPage.length - 1];
        return lastFeed ? lastFeed.id : undefined;
      },
      enabled: longtitude !== undefined && latitude !== undefined,
      initialPageParam: undefined, // Add this line
    });

  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: '200px',
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  if (!longtitude || !latitude || !data) {
    return (
      <div className="h-[calc(100vh-183px)] w-full overflow-y-scroll scrollbar-hide">
        <div className="flex flex-wrap items-center justify-between px-4">
          <FeedSkeletonCard />
          <FeedSkeletonCard />
          <FeedSkeletonCard />
          <FeedSkeletonCard />
          <FeedSkeletonCard />
          <FeedSkeletonCard />
          <FeedSkeletonCard />
          <FeedSkeletonCard />
          <FeedSkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-183px)] w-full overflow-y-scroll scrollbar-hide">
      <div className="flex flex-wrap items-center justify-center">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.map((feed: Feed) => (
              <FeedListCard key={feed.id} feed={feed} />
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <div>Loading...</div>}
        <div ref={ref} className="h-10" />
      </div>
    </div>
  );
};

export default FeedList;
