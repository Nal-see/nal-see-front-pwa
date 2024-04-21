import { useQuery } from '@tanstack/react-query';
import { CloseOutline } from 'antd-mobile-icons';
import { BottomSheet } from 'react-spring-bottom-sheet';
import useHomeStore from './store/useHomeStore';
import { api } from '@/lib/api';
import FeedListCard from '../Feed/components/FeedCard/FeedCard';
import FeedSkeletonCard from '../Feed/components/FeedCard/FeedSkeletionCard';
import { PostResponseDto } from '@/types/feed';
import SplashMan from '@/assets/splash-man.png';
import SplashSun from '@/assets/splash-sun.png';

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
      snapPoints={({ maxHeight }) =>
        data?.data.results.length > 2 ? [maxHeight * 0.9] : [maxHeight * 0.55]
      }
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
        <div className="flex size-full flex-col items-center justify-center pt-20 text-center text-base text-primary-foreground">
          <p className="text-2xl">❗️</p>
          <p>데이터를 불러오는 데 실패했습니다.</p>
          <p>네트워크 상태를 확인해주세요.</p>
        </div>
      ) : !data?.data.results.length ? (
        <div className="flex size-full flex-col items-center justify-center pt-20 text-center text-base text-primary-foreground">
          <p className="text-2xl">⚠️</p>
          <p>해당 구역의 데이터가 존재하지 않습니다.</p>
          <p>다시 시도해주세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 justify-items-center overflow-y-scroll px-2 pt-3 scrollbar-hide">
          {/* 게시물 수가 홀수개인 경우 : 빈 공간에 대체 게시물 렌더링 */}
          {data?.data.results.length % 2 === 1 ? (
            <>
              {data.data.results.map((post: PostResponseDto) => (
                <FeedListCard key={post.id} feed={post} />
              ))}
              <div className="flex w-[45dvw] flex-col gap-3">
                <div className="border-primary-foreground/50 flex h-[60dvw] flex-row items-end justify-between rounded-md border bg-gradient-to-t from-[#F5F6F7] to-accent-foreground">
                  <div className="ml-3 w-[70px]">
                    <img src={SplashMan} className="drop-shadow-md" />
                  </div>
                  <div className="mb-[90px] mr-2 w-[70px]">
                    <img src={SplashSun} className="drop-shadow-lg" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center font-light">
                  <p>지금 바로 날씨드롭을 올려</p>
                  <p>여러분의 착장을 공유해보세요!</p>
                </div>
              </div>
            </>
          ) : (
            data.data.results.map((post: PostResponseDto) => (
              <FeedListCard key={post.id} feed={post} />
            ))
          )}
        </div>
      )}
    </BottomSheet>
  );
};

export default PostGroupListDrawer;
