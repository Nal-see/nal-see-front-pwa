import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import FeedCard from './FeedCard/FeedCard';
import { useInView } from 'react-intersection-observer';
import { getFeedList } from '../services/feedApi';
import { Feed } from '@/types/feed';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';

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

  if (errorMsg || !longtitude || !latitude || !data) {
    return <div>{errorMsg}</div>;
  }

  return (
    <div className="h-[calc(100vh-183px)] w-10/12 overflow-y-scroll scrollbar-hide">
      <div className="space-y-4">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.map((feed: Feed) => (
              <FeedCard key={feed.id} feed={feed} />
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
