import BackBtnHeader from '@/components/BackBtnHeader';
import ChatItem from './components/ChatItem';
import ChatContainer from './components/ChatContainer';
import useAuthStore from '@/store/useAuthStore';
import useWebSocket from './hooks/useConnectWebsocket';
import useChatListWebSocket from './hooks/useConnectListWebSocket';

const ChatListPage = () => {
  const { user } = useAuthStore();
  const userId = user?.userId;
  const { chatList } = useChatListWebSocket();

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
