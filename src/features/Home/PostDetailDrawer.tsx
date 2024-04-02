import { useQuery } from '@tanstack/react-query';
import { getFeedDetail } from '../Feed/services/feedApi';
import FeedDetailSkeletonCard from '../Feed/components/FeedCard/FeedDetailSkeletonCard';
import { CloseOutline } from 'antd-mobile-icons';
import FeedDetailCard from '../Feed/components/FeedCard/FeedDetailCard';
import { BottomSheet } from 'react-spring-bottom-sheet';
import useHomeStore from './store/useHomeStore';

const PostDetailDrawer = ({ postId }: { postId: number | null }) => {
  const { isPostDrawerOpen, setPostDrawerOpen } = useHomeStore();

  const {
    data: feed,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['feedDetail', postId],
    queryFn: () => getFeedDetail(Number(postId)),
    enabled: !!postId,
  });

  if (isLoading) {
    return <FeedDetailSkeletonCard />;
  }

  const handleUpdateSuccess = () => {
    refetch(); // 업데이트 성공 시 데이터 다시 불러오기
  };

  return (
    <BottomSheet
      open={isPostDrawerOpen}
      onDismiss={() => setPostDrawerOpen()}
      snapPoints={({ maxHeight }) => [maxHeight * 0.9]}
    >
      <div className="inline-flex w-full justify-end px-5 pt-2">
        <CloseOutline fontSize={20} onClick={() => setPostDrawerOpen()} />
      </div>
      {!feed ? (
        <div>게시물이 존재하지 않습니다.</div>
      ) : (
        <FeedDetailCard feed={feed} onUpdateSuccess={handleUpdateSuccess} />
      )}
    </BottomSheet>
  );
};

export default PostDetailDrawer;
