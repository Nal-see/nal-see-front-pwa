import { useQuery } from '@tanstack/react-query';
import { CloseOutline } from 'antd-mobile-icons';
import { BottomSheet } from 'react-spring-bottom-sheet';
import useHomeStore from './store/useHomeStore';
import { api } from '@/lib/api';
import FeedListCard from '../Feed/components/FeedCard/FeedCard';
import FeedSkeletonCard from '../Feed/components/FeedCard/FeedSkeletionCard';
import { PostResponseDto } from '@/types/feed';

const PostGroupListDrawer = () => {
  const { selectedGroup, isPostDrawerOpen, setPostDrawerOpen } = useHomeStore();
  const { bottomLeftLat, bottomLeftLong, topRightLat, topRightLong } = {
    ...selectedGroup,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [
      'mapPostList',
      bottomLeftLat,
      bottomLeftLong,
      topRightLat,
      topRightLong,
    ],
    queryFn: () =>
      api.get('/api/map/postList', {
        params: {
          bottomLeftLat,
          bottomLeftLong,
          topRightLat,
          topRightLong,
        },
      }),
    enabled: !!selectedGroup,
  });

  return (
    <BottomSheet
      open={isPostDrawerOpen}
      onDismiss={() => setPostDrawerOpen()}
      snapPoints={({ maxHeight }) => [maxHeight * 0.9]}
    >
      <div className="inline-flex w-full justify-end px-5 pt-2">
        <CloseOutline fontSize={20} onClick={() => setPostDrawerOpen()} />
      </div>
      {isLoading ? (
        <div className="flex flex-wrap items-center justify-between px-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <FeedSkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="flex h-[600px] w-full flex-col items-center justify-center text-center text-base text-primary-foreground">
          <p className="text-2xl">❗️</p>
          <p>데이터를 불러오는 데 실패했습니다.</p>
          <p>네트워크 상태를 확인해주세요.</p>
        </div>
      ) : !data?.data.results.length ? (
        <div className="flex h-[600px] w-full flex-col items-center justify-center text-center text-base text-primary-foreground">
          <p className="text-2xl">⚠️</p>
          <p>해당 구역의 데이터가 존재하지 않습니다.</p>
          <p>다시 시도해주세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 justify-items-center">
          {data.data.results.map((post: PostResponseDto) => (
            <FeedListCard key={post.id} feed={post} />
          ))}
        </div>
      )}
    </BottomSheet>
  );
};

export default PostGroupListDrawer;
