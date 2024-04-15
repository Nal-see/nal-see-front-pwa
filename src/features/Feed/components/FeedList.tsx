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
import SplashGirl from '@/assets/splash-girl2.png';
import SplashSun from '@/assets/splash-sun.png';

const FeedList = () => {
  const { longitude, latitude, errorMsg, isCurrentLocation } =
    useCurrentLocation();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery<Feed[], string[]>({
      queryKey: ['feedList'],
      queryFn: async ({ pageParam = -1 }) => {
        console.log('pageParam: ', pageParam);
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
    return (
      <div className="h-[calc(100vh-160px)] w-full overflow-y-scroll scrollbar-hide">
        <div className="relative flex h-[calc(100dvh-155px)] items-center justify-center overflow-hidden bg-gradient-to-b from-blue-300 ">
          <img
            className="absolute right-0 top-[109.70px] h-60 w-40 origin-top-left rotate-[-46.01deg]"
            src={SplashSun}
            alt="splash-sun"
          />
          <p className="absolute inset-x-0 top-[270px] mx-auto h-20 w-max text-lg font-extrabold text-card">
            위치정보를 불러오는 데 실패했어요
          </p>

          <div className="absolute left-[-52px] top-[438px] h-[631px] w-[271.57px] overflow-hidden">
            <img
              src={SplashGirl}
              alt="splash-girl"
              className="size-full object-contain"
            />
          </div>
        </div>
      </div>
    );
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
