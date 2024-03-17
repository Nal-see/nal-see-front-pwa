import styled from 'tailwind-styled-components';

export const CommentContainer = styled.div`
  flex space-x-2 mb-4 justify-between;
`;

export const UserImage = styled.img`
  w-10 h-10 rounded-full flex-shrink-0;
`;

export const CommentContent = styled.div`
  flex-grow flex-1;
`;

export const CommentHeader = styled.div`
  flex items-center justify-between;
`;

export const Username = styled.span`
  font-bold text-sm;
`;

export const LikeButton = styled.button`
  flex items-center space-x-1 text-gray-500 ;
`;

export const LikeIcon = styled.span`
  w-4 h-4;
`;

export const LikeCount = styled.span`
  text-xs;
`;

export const Content = styled.p`
  text-sm mt-1;
`;

export const EmojiContainer = styled.div`
  flex items-center space-x-1 mt-1;
`;

export const EmojiButton = styled.button`
  text-lg;
`;

export const ReadMoreButton = styled.button`
  text-sm text-blue-500 cursor-pointer ml-1;
`;
