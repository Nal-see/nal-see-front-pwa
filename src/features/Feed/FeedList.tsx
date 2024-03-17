import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import FeedCard from './components/FeedCard';
import { useInView } from 'react-intersection-observer';
import { getFeedList } from './services/feedApi';
import { Feed } from '@/types/feed';
import CommentSheet from './components/bottonDrawer';

const FeedListPage = () => {
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
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      <CommentSheet />
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

export default FeedListPage;
