import React, { useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { Comment } from '../../../../mocks/data/commentData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CommentBox from './comment';
import { Input, StyledForm, UserImage } from './commentStyle';
import { TfiComment } from 'react-icons/tfi';
import useAuthStore from '@/store/useAuthStore';
import { getComments, postComment } from '../../services/commentApi';
import { SyncLoader } from 'react-spinners';

interface CommentSheetProps {
  postId: number;
  username: string;
  userImage: string;
  isDetail?: boolean;
}

const CommentSheet: React.FC<CommentSheetProps> = ({
  postId,
  username,
  isDetail = false,
}) => {
  const { user } = useAuthStore();
  const userId = user?.userId;
  const userImage = user?.picture;
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const sheetRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const response = await getComments(postId);
      return response as unknown as Comment[]; // 타입 단언 사용
    },
    enabled: open,
  });

  const createCommentMutation = useMutation({
    mutationFn: ({ postId, content }: { postId: number; content: string }) =>
      postComment(postId, content, Number(userId)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.postId],
        exact: true,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('newComment: ', newComment);
    createCommentMutation.mutate({ postId, content: newComment });
    setNewComment('');
  };

  return (
    <>
      <TfiComment
        className={`${isDetail ? 'mt-1.5 size-6' : 'mt-1 size-4'}`}
        onClick={() => setOpen(true)}
      />
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        snapPoints={({ maxHeight }) => [maxHeight * 0.9]}
        style={{ zIndex: 10 }}
      >
        <div
          ref={sheetRef}
          className="z-40 h-[calc(100vh-183px)] overflow-y-auto p-4"
        >
          {isLoading ? (
            <SyncLoader className="bg-accent" />
          ) : (
            comments?.map((comment: Comment) => (
              <CommentBox
                key={comment.id}
                comment={comment}
                postId={postId}
                isMyComment={comment.userId === Number(userId)}
              />
            ))
          )}
        </div>
        <StyledForm onSubmit={handleSubmit}>
          <UserImage src={userImage} alt={username} />
          <Input
            type="text"
            value={newComment}
            onChange={(e) => {
              console.log('e.value: ', e.target.value);
              setNewComment(e.target.value);
            }}
            placeholder="댓글을 입력해주세요."
          />
        </StyledForm>
      </BottomSheet>
    </>
  );
};

export default CommentSheet;
