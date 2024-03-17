import React, { useEffect, useState } from 'react';
import { Feed } from '@/types/feed';
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa';
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
import { formatDate } from '../utils/formatDate';

interface FeedCardProps {
  feed: Feed;
}

const FeedCard: React.FC<FeedCardProps> = ({ feed }) => {
  const [isLiked, setIsLiked] = useState(feed.isLiked);
  const [showFullContent, setShowFullContent] = useState(false);
  const maxContentLength = 100; // 초기에 보여줄 content의 최대 길이

  const moveProfile = () => {
    console.log('Profile image clicked');
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleToggleLike = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    console.log('Comment icon clicked');
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
          <Place>{feed.place}</Place>
        </UserInfo>
        <UploadTime>{formatDate(feed.createDate)}</UploadTime>
      </FeedCardHeader>
      <Slider {...sliderSettings}>
        {feed.pictureList.map((picture, index) => (
          <div key={index}>
            <FeedImage src={picture} alt={`${feed.place} ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <FeedCardFooter>
        <IconContainer>
          <Icon onClick={(event) => handleToggleLike(event)}>
            {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
          </Icon>
          <Icon onClick={handleComment}>
            <FaRegComment />
          </Icon>
        </IconContainer>
        <UserName>{feed.username}</UserName>
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
