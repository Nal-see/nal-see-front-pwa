import React, { useState } from 'react';
import { FeedDetail } from '@/types/feed';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formatDate } from '../../utils/dataFormatUtil';
import CommentSheet from '../comment/CommentSheet';
import { addPostLike, cancelPostLike } from '../../services/feedApi';
import { useNavigate } from 'react-router-dom';
import WeatherAnimation from '../weather/WeatherIcon';

interface FeedCardProps {
  feed: FeedDetail;
}

const FeedDetailCard: React.FC<FeedCardProps> = ({ feed }) => {
  console.log('feed:asdsajdnakjdsandna ', feed);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(feed.postResponseDto.likeCnt);
  const [showFullContent, setShowFullContent] = useState(false);
  const maxContentLength = 100;
  const navigate = useNavigate();

  const moveProfile = () => {
    if (feed) {
      navigate(`/user/${feed.postResponseDto.userId}`);
    }
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mb-4 overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <div className="flex items-center p-3 px-4">
        <img
          className="mr-3 size-10 cursor-pointer rounded-full"
          onClick={moveProfile}
          src={feed.postResponseDto.userImage}
          alt={feed.postResponseDto.username}
        />
        <div className="flex cursor-pointer flex-col" onClick={moveProfile}>
          <span className="mr-2 font-bold">
            {feed.postResponseDto.username}
          </span>
          <span className="mr-2 text-gray-600">
            {feed.postResponseDto.address}
          </span>
        </div>
        <span className="ml-auto text-sm text-gray-500">
          {formatDate(feed.postResponseDto.createDate)}
        </span>
      </div>
      <WeatherAnimation
        weather={feed.postResponseDto.weather}
        temperature={String(feed.postResponseDto.temperature)}
      />
      <Slider {...sliderSettings}>
        {feed.postResponseDto.pictureList.map((picture, index) => (
          <div key={index}>
            <img
              className="h-auto w-full rounded-md"
              src={picture}
              alt={`${feed.postResponseDto.address} ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
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
      </div>
    </div>
  );
};

export default FeedDetailCard;
