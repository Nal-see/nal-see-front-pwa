import React, { useState } from 'react';
import { Feed } from '@/types/feed';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  FeedCardContainer,
  FeedCardHeader,
  ProfileImage,
  UserInfo,
  UserName,
  Place,
  UploadTime,
  FeedImage,
  FeedCardFooter,
  IconContainer,
  Icon,
  Content,
  ToggleButton,
} from './FeedCardStyle';
import { formatDate } from '../../utils/formatDate';
import CommentSheet from '../comment/CommentSheet';
import { addPostLike, cancelPostLike } from '../../services/feedApi';
import { useNavigate } from 'react-router-dom';

interface FeedCardProps {
  feed: Feed;
}

const FeedCard: React.FC<FeedCardProps> = ({ feed }) => {
  const [isLiked, setIsLiked] = useState(feed.liked);
  const [showFullContent, setShowFullContent] = useState(false);
  const maxContentLength = 100; // 초기에 보여줄 content의 최대 길이

  const navigate = useNavigate();

  const moveProfile = () => {
    navigate(`/user/${feed.userId}`);
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleToggleLike = async (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    try {
      if (newIsLiked) {
        await addPostLike(Number(feed.id));
      } else {
        await cancelPostLike(Number(feed.id));
      }
    } catch (error) {
      console.error('게시물 좋아요 토글 실패:', error);
      setIsLiked(!newIsLiked); // 게시물 좋아요 토글 실패 시 이전 상태로 되돌림
    }
  };

  const displayedContent = showFullContent
    ? feed.content
    : feed.content.slice(0, maxContentLength);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <FeedCardContainer>
      <FeedCardHeader>
        <ProfileImage
          onClick={moveProfile}
          src={feed.userImage}
          alt={feed.username}
        />
        <UserInfo onClick={moveProfile}>
          <UserName>{feed.username}</UserName>
          <Place>{feed.address}</Place>
        </UserInfo>
        <UploadTime>{formatDate(feed.createDate)}</UploadTime>
      </FeedCardHeader>
      <Slider {...sliderSettings}>
        {feed.pictureList.map((picture, index) => (
          <div key={index}>
            <FeedImage src={picture} alt={`${feed.address} ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <FeedCardFooter>
        <IconContainer>
          <Icon onClick={(event) => handleToggleLike(event)}>
            {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
          </Icon>
          <Icon>
            <CommentSheet
              postId={Number(feed.id)}
              username={feed.username}
              userImage={feed.userImage}
            />
          </Icon>
        </IconContainer>
        <UserName onClick={moveProfile}>{feed.username}</UserName>
        <Content>
          {displayedContent}
          {feed.content.length > maxContentLength && (
            <>
              {!showFullContent ? '...' : ''}
              <ToggleButton onClick={toggleContent}>
                {showFullContent ? '접기' : '더보기'}
              </ToggleButton>
            </>
          )}
        </Content>
      </FeedCardFooter>
    </FeedCardContainer>
  );
};

export default FeedCard;
