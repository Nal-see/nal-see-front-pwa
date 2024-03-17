import BackBtnHeader from '@/components/BackBtnHeader';
import ChatItem from './components/ChatItem';
import ChatContainer from './components/ChatContainer';

const ChatListPage = () => {
  return (
    <div className="flex-1">
      <BackBtnHeader title="메시지" />
      <ChatContainer>
        <ChatItem
          chatId="1"
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={false}
        />
        <ChatItem
          chatId="1"
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          chatId="1"
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={false}
        />
        <ChatItem
          chatId="1"
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          chatId="1"
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          chatId="1"
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          chatId="1"
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          chatId="1"
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          chatId="1"
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
