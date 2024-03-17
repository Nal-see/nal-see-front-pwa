import React, { useState } from 'react';

import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { getComments, postComment } from '../services/feedApi';
import { Comment } from '../data/commentData';
import { useInfiniteQuery } from '@tanstack/react-query';
import CommentBox from './comment';

const CommentSheet: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['comments'],
      queryFn: ({ pageParam = 1 }: { pageParam?: number | undefined }) =>
        getComments(pageParam),
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage[lastPage.length - 1];
        return lastPage.length !== 0 ? nextPage : undefined;
      },
      initialPageParam: undefined,
    });

  const comments: Comment[] = data?.pages.flat() || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // postCommentMutation.mutate({ content: newComment });
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Comments</button>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        snapPoints={({ maxHeight }) => [maxHeight * 0.9]} // 화면의 90%로 설정
      >
        <div style={{ maxHeight: '100%', overflowY: 'auto', padding: '16px' }}>
          {comments.map((comment: Comment) => (
            <CommentBox key={comment.id} comment={comment} />
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          />
          <button type="submit" style={{ width: '100%', padding: '8px' }}>
            Submit
          </button>
        </form>
      </BottomSheet>
    </>
  );
};

export default CommentSheet;
