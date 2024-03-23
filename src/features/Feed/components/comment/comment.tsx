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
  UserImage,
  Username,
} from './commentStyle';
import { Comment as CommentType } from '../../../../mocks/data/commentData';
import { ToggleButton } from '../FeedCard/FeedCardStyle';
import { addCommentLike, cancelCommentLike } from '../../services/feedApi';
import { useNavigate } from 'react-router-dom';

interface CommentProps {
  comment: CommentType;
  postId: number;
}

const Comment: React.FC<CommentProps> = ({ comment, postId }) => {
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [likeCount, setLikeCount] = useState(comment.likeCNT);
  const [showFullContent, setShowFullContent] = useState(false);

  const navigate = useNavigate();

  const moveProfile = () => {
    navigate(`/user/${comment.userId}`);
  };

  const toggleLike = async () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount(newIsLiked ? likeCount + 1 : likeCount - 1);
    try {
      if (newIsLiked) {
        await addCommentLike(postId, comment.id);
      } else {
        await cancelCommentLike(postId, comment.id);
      }
    } catch (error) {
      console.error('댓글 좋아요 토글 실패:', error);
      setIsLiked(!newIsLiked);
      setLikeCount(newIsLiked ? likeCount - 1 : likeCount + 1);
    }
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
      <UserImage
        onClick={moveProfile}
        src={comment.userImage}
        alt={comment.username}
      />
      <CommentContent>
        <CommentHeader>
          <Username onClick={moveProfile}>{comment.username}</Username>
        </CommentHeader>
        <Content>
          {displayedContent}
          {isContentLong && (
            <ToggleButton onClick={toggleContent}>
              {showFullContent ? '접기' : '더보기'}
            </ToggleButton>
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
