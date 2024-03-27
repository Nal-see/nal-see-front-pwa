import BackBtnHeader from '@/components/BackBtnHeader';
import { useParams } from 'react-router-dom';
import { getFeedDetail } from './services/feedApi';
import { useEffect, useState } from 'react';
import FeedDetailCard from './components/FeedCard/FeedDetailCard';
import FeedDetailSkeletonCard from './components/FeedCard/FeedDetailSkeletonCard';
import { FeedDetail } from '@/types/feed';

const FeedDetailPage = () => {
  const { feedId } = useParams<{ feedId: string }>();
  const [feed, setFeed] = useState<FeedDetail | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (feedId) {
        const data = await getFeedDetail(Number(feedId));
        setFeed(data);
      }
    }

    fetchData();
  }, [feedId]);

  if (!feed) {
    return <FeedDetailSkeletonCard />;
  }

  return (
    <div>
      <BackBtnHeader title="상세페이지" />
      <FeedDetailCard feed={feed} />
    </div>
  );
};

export default FeedDetailPage;
