// useFeedInteraction.ts
import { useState } from 'react';
import { addPostLike, cancelPostLike } from '@/features/Feed/services/feedApi';

const useFeedInteraction = (initialLikeCnt: number, postId: number) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(initialLikeCnt);

  const handleToggleLike = async (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    try {
      if (newIsLiked) {
        await addPostLike(postId);
        setLikeCnt(likeCnt + 1);
      } else {
        await cancelPostLike(postId);
        setLikeCnt(likeCnt - 1);
      }
    } catch (error) {
      console.error('게시물 좋아요 토글 실패:', error);
      setIsLiked(!newIsLiked);
    }
  };

  return {
    isLiked,
    likeCnt,
    handleToggleLike,
  };
};

export default useFeedInteraction;
