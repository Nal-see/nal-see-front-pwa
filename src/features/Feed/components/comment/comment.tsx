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
import { useNavigate } from 'react-router-dom';
import {
  addCommentLike,
  cancelCommentLike,
  deleteComment,
  updateComment,
} from '../../services/commentApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { convertImgSrcToHTTPS } from '@/lib/helpers';

interface CommentProps {
  comment: CommentType;
  postId: number;
  isMyComment: boolean;
}

const Comment: React.FC<CommentProps> = ({ comment, postId, isMyComment }) => {
  const [isLiked, setIsLiked] = useState(comment.liked);
  const [likeCount, setLikeCount] = useState(comment.likeCNT);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(postId, comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: () =>
      updateComment(postId, comment.id, editedContent, comment.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setIsEditing(false);
    },
  });
  const moveProfile = () => {
    navigate(`/user/${comment.userId}`);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateCommentMutation.mutate();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleDelete = () => {
    try {
      console.log('댓글 삭제');
      deleteCommentMutation.mutate();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
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
        src={
          comment.userImage
            ? convertImgSrcToHTTPS(comment.userImage)
            : '/assets/weatherImage/placeholder.jpg'
        }
        alt={comment.username}
      />
      <CommentContent>
        <CommentHeader>
          <Username onClick={moveProfile}>{comment.username}</Username>
          {isMyComment && (
            <div className="ml-4 flex gap-3">
              {isEditing ? (
                <>
                  <div onClick={handleSave}>저장</div>
                  <div onClick={handleCancel}>취소</div>
                </>
              ) : (
                <>
                  <div onClick={handleEdit}>수정</div>
                  <div onClick={handleDelete}>삭제</div>
                </>
              )}
            </div>
          )}
        </CommentHeader>
        {isEditing ? (
          <Content>
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full rounded-md focus:border-blue-500 focus:outline-none"
            />
          </Content>
        ) : (
          <Content>
            {displayedContent}
            {isContentLong && (
              <ToggleButton onClick={toggleContent}>
                {showFullContent ? '접기' : '더보기'}
              </ToggleButton>
            )}
          </Content>
        )}
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
