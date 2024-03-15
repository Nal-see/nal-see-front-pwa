import { Feed } from '@/types/feed';
import { FaHeart, FaComment } from 'react-icons/fa';
import {
  FeedCardContainer,
  FeedCardHeader,
  ProfileImage,
  UserName,
  Place,
  UploadTime,
  FeedImage,
  FeedCardFooter,
  IconContainer,
  Icon,
  Content,
} from './FeedCardStyle';

const FeedCard = ({ feed }: { feed: Feed }) => {
  return (
    <FeedCardContainer>
      <FeedCardHeader>
        <ProfileImage src={feed.userImage} alt={feed.username} />
        <UserName>{feed.username}</UserName>
        <Place>{feed.place}</Place>
        <UploadTime>{feed.createDate}</UploadTime>
      </FeedCardHeader>
      <FeedImage src={feed.pictureList} alt={feed.place} />
      <FeedCardFooter>
        <IconContainer>
          <Icon>
            <FaHeart />
          </Icon>
          <Icon>
            <FaComment />
          </Icon>
        </IconContainer>
        <UserName>{feed.username}</UserName>
        <Content>{feed.content}</Content>
      </FeedCardFooter>
    </FeedCardContainer>
  );
};

export default FeedCard;
