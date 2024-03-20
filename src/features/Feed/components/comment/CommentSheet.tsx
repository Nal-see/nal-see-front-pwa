import React, { useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { Comment } from '../../data/commentData';
import { useQuery } from '@tanstack/react-query';
import CommentBox from './comment';
import { Input, StyledForm, UserImage } from './commentStyle';
import { FaRegComment } from 'react-icons/fa';
import { getComments } from '../../services/feedApi';

interface CommentSheetProps {
  postId: number;
  username: string;
  userImage: string;
}

const CommentSheet: React.FC<CommentSheetProps> = ({
  postId,
  username,
  userImage,
}) => {
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const sheetRef = useRef<HTMLDivElement>(null);

  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const response = await getComments(postId);
      console.log('response: ', response);
      return response as unknown as Comment[]; // 타입 단언 사용
    },
    enabled: open,
  });

  const moveProfile = () => {
    console.log('Profile image clicked');
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('newComment: ', newComment);
    // postCommentMutation.mutate({ content: newComment });
    setNewComment('');
  };

  return (
    <>
      <FaRegComment onClick={() => setOpen(true)}>Open Comments</FaRegComment>
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
            <div>Loading...</div>
          ) : (
            comments?.map((comment: Comment) => (
              <CommentBox key={comment.id} comment={comment} postId={postId} />
            ))
          )}
        </div>
        <StyledForm onSubmit={handleSubmit}>
          <UserImage onClick={moveProfile} src={userImage} alt={username} />
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
