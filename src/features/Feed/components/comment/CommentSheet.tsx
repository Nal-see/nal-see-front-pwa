import React, { useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { getComments } from '../../services/feedApi';
import { Comment } from '../../data/commentData';
import { useQuery } from '@tanstack/react-query';
import CommentBox from './comment';
import { Input } from 'antd-mobile';
import { StyledForm, SubmitButton } from './commentStyle';
import { FaRegComment } from 'react-icons/fa';
import { ProfileImage } from '../FeedCard/FeedCardStyle';

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
      return response;
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
      >
        <div
          ref={sheetRef}
          className="z-40 max-h-full overflow-y-auto p-4 pb-20"
          // style={{
          //   maxHeight: '100%',
          //   overflowY: 'auto',
          //   padding: '16px',
          //   paddingBottom: '80px',

          // }}
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            comments?.map((comment) => (
              <CommentBox key={comment.id} comment={comment} />
            ))
          )}
        </div>
        <StyledForm onSubmit={handleSubmit}>
          <ProfileImage onClick={moveProfile} src={userImage} alt={username} />
          <Input
            type="text"
            value={newComment}
            onChange={(e) => {
              console.log('e.value: ', e);
              setNewComment(e);
            }}
            placeholder="Add a comment"
            className="mt-2"
          />
        </StyledForm>
      </BottomSheet>
    </>
  );
};

export default CommentSheet;
