import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getFeedList } from '../services/feedApi';
import { Feed } from '@/types/feed';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import FeedSkeletonCard from './FeedCard/FeedSkeletionCard';
import FeedListCard from './FeedCard/FeedCard';
import { SyncLoader } from 'react-spinners';
import { LocationStatusView } from './isCurrentLocation/IsCurrentLocation';
const FeedList = () => {
  const { longitude, latitude, errorMsg, isCurrentLocation } =
    useCurrentLocation();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery<Feed[], string[]>({
      queryKey: ['feedList'],
      queryFn: async ({ pageParam = -1 }) => {
        const response = await getFeedList(
          pageParam as number,
          longitude as number,
          latitude as number,
        );
        return response;
      },
      getNextPageParam: (lastPage) => {
        const lastFeed = lastPage[lastPage.length - 1];
        return lastFeed ? lastFeed.postResponseDto.id : undefined;
      },
      enabled: longitude !== undefined && latitude !== undefined,
      initialPageParam: undefined,
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

  useEffect(() => {
    if (!isCurrentLocation) {
      refetch();
    }
  }, [isCurrentLocation, refetch]);

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  if (!data) {
    return (
      <div className="h-[calc(100vh-160px)] w-full overflow-y-scroll scrollbar-hide">
        <div className="flex flex-wrap items-center justify-between px-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <FeedSkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-160px)] w-full overflow-y-scroll scrollbar-hide">
      <LocationStatusView isCurrentLocation={isCurrentLocation} />
      <div className="grid grid-cols-2 justify-items-center">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.map((feed: Feed) => (
              <FeedListCard
                key={feed.postResponseDto.id}
                feed={feed.postResponseDto}
              />
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <SyncLoader color="#3ba5ff" />}
        <div ref={ref} className="h-10" />
      </div>
    </div>
  );
};

export default FeedList;
