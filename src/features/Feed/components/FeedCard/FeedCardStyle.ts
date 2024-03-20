import styled from 'tailwind-styled-components';

//border border-gray-300 rounded-md
export const FeedCardContainer = styled.div`
   mb-4
`;

export const FeedCardHeader = styled.div`
  flex items-center p-3
`;

export const ProfileImage = styled.img`
  w-10 h-10 rounded-full mr-3
`;

export const UserInfo = styled.div`
  flex flex-col
`;

export const UserName = styled.span`
  font-bold mr-2
`;

export const Place = styled.span`
  text-gray-600 mr-2
`;

export const UploadTime = styled.span`
  text-gray-500 ml-auto
`;

export const FeedImage = styled.img`
  w-full h-auto rounded-md
`;

export const FeedCardFooter = styled.div`
  p-3
`;

export const IconContainer = styled.div`
  flex mb-2
`;

export const Icon = styled.span`
  mr-2 cursor-pointer z-0
`;

export const Content = styled.p`
  m-0
`;

export const MoreButton = styled.button`
  text-sm text-blue-500 ml-1 focus:outline-none
`;

export const ToggleButton = styled.button`
  text-sm text-blue-500 ml-1 focus:outline-none
`;
