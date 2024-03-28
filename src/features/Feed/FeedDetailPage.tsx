import BackBtnHeader from '@/components/BackBtnHeader';
import { useParams } from 'react-router-dom';
import { getFeedDetail } from './services/feedApi';
import FeedDetailCard from './components/FeedCard/FeedDetailCard';
import FeedDetailSkeletonCard from './components/FeedCard/FeedDetailSkeletonCard';
import { useQuery } from '@tanstack/react-query';

const FeedDetailPage = () => {
  const { feedId } = useParams<{ feedId: string }>();
  const {
    data: feed,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['feedDetail', feedId],
    queryFn: () => getFeedDetail(Number(feedId)),
    enabled: !!feedId,
  });

  if (isLoading) {
    return <FeedDetailSkeletonCard />;
  }

  const handleUpdateSuccess = () => {
    refetch(); // 업데이트 성공 시 데이터 다시 불러오기
  };

  return (
    <div>
      <BackBtnHeader title="상세페이지" />
      {!feed ? (
        <div>게시물이 존재하지 않습니다.</div>
      ) : (
        <FeedDetailCard feed={feed} onUpdateSuccess={handleUpdateSuccess} />
      )}
    </div>
  );
};

export default FeedDetailPage;
