import React, { useState } from 'react';
import { Feed } from '@/types/feed';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formatDate, formatLikeCnt } from '../../utils/dataFormatUtil';
import CommentSheet from '../comment/CommentSheet';
import { addPostLike, cancelPostLike } from '../../services/feedApi';
import { useNavigate } from 'react-router-dom';

interface FeedCardProps {
  feed: Feed;
}

const FeedListCard: React.FC<FeedCardProps> = ({ feed }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(feed.likeCnt);
  const [showFullContent, setShowFullContent] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const maxContentLength = 15;
  const navigate = useNavigate();

  const moveProfile = () => {
    if (feed) {
      navigate(`/user/${feed.userId}`);
    }
  };

  const moveToDetailPage = () => {
    navigate(`/feeds/${feed.id}`);
  };

  const handleToggleLike = async (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    try {
      if (feed) {
        if (newIsLiked) {
          await addPostLike(Number(feed.id));
          setLikeCnt(likeCnt + 1);
        } else {
          await cancelPostLike(Number(feed.id));
          setLikeCnt(likeCnt - 1);
        }
      }
    } catch (error) {
      console.error('게시물 좋아요 토글 실패:', error);
      setIsLiked(!newIsLiked);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass:
      'slick-dots absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center z-1',
    customPaging: (i: number) => {
      const isActive = i === currentSlide;
      return (
        <div
          className={`mx-1 size-3 cursor-pointer opacity-50 transition-opacity duration-300 hover:opacity-100 ${
            isActive ? 'bg-primary' : 'bg-white'
          }`}
        ></div>
      );
    },
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const displayedContent =
    feed && showFullContent
      ? feed.content
      : feed?.content.slice(0, maxContentLength);

  return (
    <div className="m-1 mb-4 w-[45vw]">
      <div onClick={moveToDetailPage} className="cursor-pointer">
        <Slider {...sliderSettings}>
          {feed.pictureList.map((picture, index) => (
            <div key={index} className="">
              <img
                className="size-full"
                src={picture}
                alt={`${feed.address} ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
        <div>
          <div className="mb-1 flex items-center">
            <img
              className="mr-2 size-5 cursor-pointer rounded-full"
              onClick={moveProfile}
              src={feed.userImage}
              alt={feed.username}
            />
            <div className="flex cursor-pointer" onClick={moveProfile}>
              <span className="mr-2 font-medium">{feed.username}</span>
              {/* <span className="mr-2 text-gray-600">{feed.address}</span> */}
            </div>
            {/* <span className="ml-auto text-sm text-gray-500">
              {formatDate(feed.createDate)}
            </span> */}
          </div>
          <p className="m-0">
            {displayedContent}
            {feed.content.length > maxContentLength && (
              <>{!showFullContent ? '...' : ''}</>
            )}
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
