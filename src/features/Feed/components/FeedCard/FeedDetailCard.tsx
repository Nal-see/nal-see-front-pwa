import React, { useState } from 'react';
import { Feed } from '@/types/feed';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formatDate } from '../../utils/dataFormatUtil';
import CommentSheet from '../comment/CommentSheet';
import { addPostLike, cancelPostLike } from '../../services/feedApi';
import { useNavigate } from 'react-router-dom';

interface FeedCardProps {
  feed: Feed;
}

const FeedDetailCard: React.FC<FeedCardProps> = ({ feed }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const maxContentLength = 100;
  const navigate = useNavigate();

  const moveProfile = () => {
    if (feed) {
      navigate(`/user/${feed.userId}`);
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
          await addPostLike(Number(feed.id));
        } else {
          await cancelPostLike(Number(feed.id));
        }
      }
    } catch (error) {
      console.error('게시물 좋아요 토글 실패:', error);
      setIsLiked(!newIsLiked);
    }
  };

  const displayedContent =
    feed && showFullContent
      ? feed.content
      : feed?.content?.slice(0, maxContentLength);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mb-4 overflow-x-hidden scrollbar-hide">
      <div className="flex items-center p-3 px-4">
        <img
          className="mr-3 size-10 cursor-pointer rounded-full"
          onClick={moveProfile}
          src={feed.userImage}
          alt={feed.username}
        />
        <div className="flex cursor-pointer flex-col" onClick={moveProfile}>
          <span className="mr-2 font-bold">{feed.username}</span>
          <span className="mr-2 text-gray-600">{feed.address}</span>
        </div>
        <span className="ml-auto text-sm text-gray-500">
          {formatDate(feed.createDate)}
        </span>
      </div>
      <Slider {...sliderSettings}>
        {feed.pictureList.map((picture, index) => (
          <div key={index}>
            <img
              className="h-auto w-full rounded-md"
              src={picture}
              alt={`${feed.address} ${index + 1}`}
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
              <PiHeartStraightFill className="size-5" color="red" />
            ) : (
              <PiHeartStraightLight className="size-5" />
            )}
          </span>
          <span className="z-0 mr-2 cursor-pointer">
            <CommentSheet
              postId={Number(feed.id)}
              username={feed.username}
              userImage={feed.userImage}
            />
          </span>
        </div>
        <span className="mr-2 font-bold">좋아요 {feed.likeCnt}</span>
        <p className="m-0">
          {displayedContent}
          {feed.content.length > maxContentLength && (
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
