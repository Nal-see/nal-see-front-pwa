import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {
  CommentContainer,
  CommentContent,
  CommentHeader,
  Content,
  LikeButton,
  LikeCount,
  LikeIcon,
  ReadMoreButton,
  UserImage,
  Username,
} from './commentStyle';
import { Comment as CommentType } from '../data/commentData';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [likeCount, setLikeCount] = useState(comment.likeCNT);
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const isContentLong = comment.content.length > 40;
  const displayedContent =
    showFullContent || !isContentLong
      ? comment.content
      : comment.content.slice(0, 40) + '...';

  return (
    <CommentContainer>
      <UserImage src={comment.userImage} alt={comment.username} />
      <CommentContent>
        <CommentHeader>
          <Username>{comment.username}</Username>
        </CommentHeader>
        <Content>
          {displayedContent}
          {isContentLong && (
            <ReadMoreButton onClick={toggleContent}>
              {showFullContent ? '접기' : '더보기'}
            </ReadMoreButton>
          )}
        </Content>
      </CommentContent>
      <LikeButton onClick={toggleLike}>
        <LikeIcon>
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </LikeIcon>
        <LikeCount>{likeCount}</LikeCount>
      </LikeButton>
    </CommentContainer>
  );
};

export default Comment;
