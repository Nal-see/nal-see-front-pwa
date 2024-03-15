import BackBtnHeader from '@/components/BackBtnHeader';
import ChatItem from './components/ChatItem';
import ChatContainer from './components/ChatContainer';

const ChatListPage = () => {
  return (
    <div className="relative">
      <BackBtnHeader title="메시지" />
      <ChatContainer>
        <ChatItem
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={false}
        />
        <ChatItem
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={false}
        />
        <ChatItem
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
      </ChatContainer>
    </div>
  );
};

export default ChatListPage;
