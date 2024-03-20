import React, { useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { getComments } from '../services/feedApi';
import { Comment } from '../data/commentData';
import { useInfiniteQuery } from '@tanstack/react-query';
import CommentBox from './comment';
import { useInView } from 'react-intersection-observer';
import { Input } from 'antd-mobile';
import { StyledForm, SubmitButton } from './commentStyle';
import { FaRegComment } from 'react-icons/fa';

const CommentSheet: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const sheetRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Comment[], string[], string | undefined>({
      queryKey: ['comments'],
      queryFn: async ({
        pageParam = 10,
      }: {
        pageParam?: number | undefined;
      }) => {
        console.log('pageParam: ', pageParam);
        const response = await getComments(pageParam);
        return response;
      },
      getNextPageParam: (lastPage) => {
        const lastComment = lastPage[lastPage.length - 1];
        return lastComment ? lastComment.id : undefined;
      },
    });

  const comments: Comment[] = data?.pages.flatMap((page) => page) || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // postCommentMutation.mutate({ content: newComment });
    setNewComment('');
  };

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <FaRegComment onClick={() => setOpen(true)}>Open Comments</FaRegComment>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        snapPoints={({ maxHeight }) => [maxHeight * 0.9]}
      >
        <div
          ref={sheetRef}
          style={{
            maxHeight: '100%',
            overflowY: 'auto',
            padding: '16px',
            paddingBottom: '80px',
          }}
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            comments.map((comment) => (
              <CommentBox key={comment.id} comment={comment} />
            ))
          )}
          {isFetchingNextPage && <div>Loading more...</div>}
          <div ref={ref} />
        </div>
        <StyledForm onSubmit={handleSubmit}>
          <Input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <SubmitButton type="submit">Submit</SubmitButton>
        </StyledForm>
      </BottomSheet>
    </>
  );
};

export default CommentSheet;
