import { useQuery } from '@tanstack/react-query';
import FeedItem from './FeedItem';

const ProfileFeedList = () => {
  return (
    <div>{feedList?.map((feed) => <FeedItem key={feed.id} item={feed} />)}</div>
  );
};
