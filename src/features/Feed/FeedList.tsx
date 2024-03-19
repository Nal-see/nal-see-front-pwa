import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import FeedCard from './components/FeedCard';
import { useInView } from 'react-intersection-observer';
import { getFeedList } from './services/feedApi';
import { Feed } from '@/types/feed';

const FeedList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<Feed[], string[], string | undefined>({
      queryKey: ['feedList'],
      queryFn: async ({
        pageParam = 10,
      }: {
        pageParam?: number | undefined;
      }) => {
        const response = await getFeedList(pageParam);
        return response;
      },
      getNextPageParam: (lastPage) => {
        const lastFeed = lastPage[lastPage.length - 1];
        return lastFeed ? lastFeed.id : undefined;
      },
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

  // if (!data?.pages) return <div>Loading...</div>;
  return (
    <div className="max-h-full w-10/12">
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.map((feed: Feed) => (
            <FeedCard key={feed.id} feed={feed} />
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <div>Loading...</div>}
      <div ref={ref} />
    </div>
  );
};

export default FeedList;
