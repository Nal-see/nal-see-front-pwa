import styled from 'tailwind-styled-components';

export const CommentContainer = styled.div`
  flex space-x-2 pb-3 mb-4 justify-between;
`;

export const UserImage = styled.img`
  w-10 h-10 rounded-full mr-4;
`;

export const CommentContent = styled.div`
  w-full ml-10;
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

export const ReadMoreButton = styled.button`
  text-sm text-blue-500 cursor-pointer ml-1;
`;

export const StyledForm = styled.form`
  flex items-center w-full py-2 px-4 bg-white shadow-md rounded-lg;
`;

export const Input = styled.input`
  flex-grow mt-1 px-4 py-2 ml-3 border border-gray-300 rounded-3xl focus:outline-none focus:border-transparent text-sm;
`;
