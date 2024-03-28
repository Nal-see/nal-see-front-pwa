import React, { useEffect, useState } from 'react';
import { FeedDetail } from '@/types/feed';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formatDate, formatUserConstitution } from '../../utils/dataFormatUtil';
import CommentSheet from '../comment/CommentSheet';
import {
  addPostLike,
  cancelPostLike,
  deletePost,
} from '../../services/feedApi';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import { GoPencil } from 'react-icons/go';
import { FaTrashAlt } from 'react-icons/fa';
import { WeatherBar } from '@/components/WeatherCard';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { PostEditSheet } from '@/features/Profile/components/EditSheet';
import {
  CarouselContent,
  CarouselItem,
  Carousel,
  CarouselApi,
} from '@/components/ui/carousel';
interface FeedCardProps {
  feed: FeedDetail;
}

const FeedDetailCard: React.FC<FeedCardProps> = ({ feed }) => {
  const { user } = useAuthStore();
  const isMyFeed = feed.postResponseDto.userId === Number(user?.userId);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(feed.postResponseDto.likeCnt);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [slideCount, setSlideCount] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [showFullContent, setShowFullContent] = useState(false);
  const maxContentLength = 100;
  const navigate = useNavigate();

  useEffect(() => {
    if (!api) return;

    setSlideCount(api.scrollSnapList().length);
    setCurrentSlide(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const handleCloseEditSheet = () => {
    setIsEditSheetOpen(false);
  };

  const moveProfile = () => {
    if (feed) {
      navigate(`/user/${feed.postResponseDto.userId}`);
    }
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleDelete = async () => {
    try {
      if (feed) {
        await deletePost(Number(feed.postResponseDto.id));
        alert('게시물이 삭제되었습니다.');
        navigate(-1);
      }
    } catch (error) {
      console.error('게시물 삭제 실패:', error);
    }
  };

  const handleEdit = () => {
    setIsEditSheetOpen(true);
  };

  const handleToggleLike = async (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    try {
      if (feed) {
        if (newIsLiked) {
          await addPostLike(Number(feed.postResponseDto.id));
          setLikeCnt(likeCnt + 1);
        } else {
          await cancelPostLike(Number(feed.postResponseDto.id));
          setLikeCnt(likeCnt - 1);
        }
      }
    } catch (error) {
      console.error('게시물 좋아요 토글 실패:', error);
      setIsLiked(!newIsLiked);
    }
  };

  const displayedContent =
    feed && showFullContent
      ? feed.postResponseDto.content
      : feed?.postResponseDto.content?.slice(0, maxContentLength);

  return (
    <div className="mb-4 h-[calc(100vh-173px)] overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex">
          <img
            className="mr-3 size-10 cursor-pointer rounded-full"
            onClick={moveProfile}
            src={feed.postResponseDto.userImage}
            alt={feed.postResponseDto.username}
          />
          <div className="flex cursor-pointer flex-col" onClick={moveProfile}>
            <div className="flex items-center gap-2">
              <span className="mr-1 font-bold">
                {feed.postResponseDto.username}
              </span>
              <div className="text-primary-foreground">
                {feed.userInfo.height ? `${feed.userInfo.height}cm` : ''}
              </div>
              <div className="text-primary-foreground">
                {feed.userInfo.weight ? `${feed.userInfo.weight}kg` : ''}
              </div>
            </div>
            <span className="mr-2 text-gray-600">
              {feed.postResponseDto.address}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isMyFeed ? (
            <>
              <GoPencil onClick={handleEdit} />
              <FaTrashAlt onClick={handleDelete} />
            </>
          ) : null}
          <span className=" text-sm text-gray-500">
            {formatDate(feed.postResponseDto.createDate)}
          </span>
        </div>
      </div>
      <div className="relative">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {feed.postResponseDto.pictureList.map((picture, index) => (
              <CarouselItem key={index}>
                <div className="relative h-96">
                  <img
                    className="absolute left-0 top-0 size-full object-cover"
                    src={picture}
                    alt={``}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-x-0 bottom-2 flex justify-center">
          {Array.from({ length: slideCount }).map((_, index) => (
            <div
              key={index}
              className={`mx-1 size-2 rounded-full ${
                currentSlide === index + 1 ? 'bg-white' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="p-3">
        <div className="mb-2 flex">
          <span
            className="z-0 mr-2 cursor-pointer"
            onClick={(event) => handleToggleLike(event)}
          >
            {isLiked ? (
              <PiHeartStraightFill className="size-8" color="red" />
            ) : (
              <PiHeartStraightLight className="size-8" />
            )}
          </span>
          <span className="z-0 mr-2 cursor-pointer">
            <CommentSheet
              isDetail={true}
              postId={Number(feed.postResponseDto.id)}
              username={feed.postResponseDto.username}
              userImage={feed.postResponseDto.userImage}
            />
          </span>
        </div>
        <span className="ml-0.5 text-base font-normal">좋아요 {likeCnt}</span>
        <p className="m-0">
          {displayedContent}
          {feed.postResponseDto.content.length > maxContentLength && (
            <>
              {!showFullContent ? '...' : ''}
              <button
                className="ml-1 text-sm text-gray-500 focus:outline-none"
                onClick={toggleContent}
              >
                {showFullContent ? '접기' : '더보기'}
              </button>
            </>
          )}
        </p>
        <div className="flex gap-1">
          {feed.userInfo.style.map((style, index) => (
            <div key={index} className="mr-2 mt-2 text-primary-foreground">
              #{style}
            </div>
          ))}
        </div>
        <div className="mr-2 mt-2 text-primary-foreground">
          {feed.userInfo.constitution
            ? `체질: ${formatUserConstitution(feed.userInfo.constitution)}`
            : ''}
        </div>
      </div>
      <WeatherBar
        weather={feed.postResponseDto.weather}
        temperature={String(feed.postResponseDto.temperature)}
      />
      <BottomSheet
        open={isEditSheetOpen}
        onDismiss={handleCloseEditSheet}
        snapPoints={({ maxHeight }) => [maxHeight * 0.9]}
      >
        <PostEditSheet
          userInfo={feed.userInfo}
          content={feed.postResponseDto.content}
          postId={Number(feed.postResponseDto.id)}
          onClose={handleCloseEditSheet}
        />
      </BottomSheet>
    </div>
  );
};

export default FeedDetailCard;
