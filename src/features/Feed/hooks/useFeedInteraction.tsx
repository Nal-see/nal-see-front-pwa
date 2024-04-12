import { useState } from 'react';
import { addPostLike, cancelPostLike } from '@/features/Feed/services/feedApi';

const useFeedInteraction = (
  liked: boolean,
  initialLikeCnt: number,
  postId: number,
) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCnt, setLikeCnt] = useState(initialLikeCnt);

  const handleToggleLike = async (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCnt(newIsLiked ? likeCnt + 1 : likeCnt - 1); // 낙관적 업데이트

    try {
      if (newIsLiked) {
        await addPostLike(postId);
      } else {
        await cancelPostLike(postId);
      }
    } catch (error) {
      console.error('게시물 좋아요 토글 실패:', error);
      setIsLiked(!newIsLiked); // 실패 시 이전 상태로 되돌림
      setLikeCnt(newIsLiked ? likeCnt - 1 : likeCnt + 1); // 실패 시 이전 개수로 되돌림
    }
  };

  return { isLiked, likeCnt, handleToggleLike };
};

export default useFeedInteraction;
