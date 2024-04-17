import React from 'react';
import { PostResponseDto } from '@/types/feed';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import { formatLikeCnt } from '../../utils/dataFormatUtil';
import CommentSheet from '../comment/CommentSheet';
import { useNavigate } from 'react-router-dom';
import CircleProfileImg from '@/components/CircleProfileImg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import useFeedInteraction from '../../hooks/useFeedInteraction';
import useCarousel from '../../hooks/useCarosel';
import { convertImgSrcToHTTPS } from '@/lib/helpers';

interface FeedCardProps {
  feed: PostResponseDto;
}

const FeedListCard: React.FC<FeedCardProps> = ({ feed }) => {
  const maxContentLength = 15;
  const navigate = useNavigate();

  const { isLiked, likeCnt, handleToggleLike } = useFeedInteraction(
    feed.liked,
    feed.likeCnt,
    Number(feed.id),
  );

  const { currentSlide, slideCount, setApi } = useCarousel();

  const moveToDetailPage = () => {
    navigate(`/feeds/${feed.id}`);
  };

  const displayedContent =
    feed?.content.length < maxContentLength
      ? feed.content
      : feed?.content.slice(0, maxContentLength);

  return (
    <div className="mb-3 w-[45dvw]">
      <div onClick={moveToDetailPage} className="cursor-pointer">
        <div className="relative">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {feed.pictureList.map((picture, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[60dvw]">
                    <img
                      className="absolute left-0 top-0 size-full rounded-md object-cover"
                      src={picture}
                      alt={`${feed.address} ${index + 1}`}
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
        <div>
          <div className="mb-1 mt-2 flex items-center">
            <CircleProfileImg
              profileImgUrl={
                feed.userImage
                  ? convertImgSrcToHTTPS(feed.userImage)
                  : '/assets/weatherImage/placeholder.jpg'
              }
              size="size-5 mr-2"
            />
            <div className="flex cursor-pointer">
              <span className="mr-2 font-medium">{feed.username}</span>
            </div>
          </div>
          <p className="m-0">
            {displayedContent}
            {feed.content.length > maxContentLength && '...'}
          </p>
        </div>
      </div>
      <div className="mb-2 flex">
        <span
          className="z-0 mr-1 flex cursor-pointer"
          onClick={(event) => handleToggleLike(event)}
        >
          {isLiked ? (
            <PiHeartStraightFill className="size-5" color="red" />
          ) : (
            <PiHeartStraightLight className="size-5" />
          )}
        </span>
        <span>{formatLikeCnt(likeCnt)}</span>
        <span className="z-0 mx-3 cursor-pointer">
          <CommentSheet
            postId={Number(feed.id)}
            username={feed.username}
            userImage={feed.userImage}
          />
        </span>
      </div>
    </div>
  );
};

export default FeedListCard;
