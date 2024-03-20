import { ReactNode } from 'react';

const ChatContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[calc(100dvh-152px)] overflow-y-scroll scrollbar-hide">
      {children}
    </div>
  );
};

export default ChatContainer;
