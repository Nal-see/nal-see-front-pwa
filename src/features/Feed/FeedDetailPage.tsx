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
    return (
      <div className="h-[calc(100dvh-80px)]">
        <BackBtnHeader title="" />
        <FeedDetailSkeletonCard />;
      </div>
    );
  }

  const handleUpdateSuccess = () => {
    refetch(); // 업데이트 성공 시 데이터 다시 불러오기
  };

  return (
    <div>
      <BackBtnHeader title="" />
      {!feed ? (
        <div className="flex h-[calc(100dvh-128px)] flex-col items-center justify-center text-lg text-primary-foreground">
          <span>❗️</span>
          <p>게시물을 불러올 수 없습니다.</p>
          <p>페이지를 새로고침해주세요.</p>
        </div>
      ) : (
        <FeedDetailCard feed={feed} onUpdateSuccess={handleUpdateSuccess} />
      )}
    </div>
  );
};

export default FeedDetailPage;
