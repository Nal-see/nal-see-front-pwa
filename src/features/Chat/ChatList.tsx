import BackBtnHeader from '@/components/BackBtnHeader';
import ChatItem from './components/ChatItem';
import ChatContainer from './components/ChatContainer';
import useAuthStore from '@/store/useAuthStore';
import useWebSocketStore from '@/store/useWebsocketStore';
import { useEffect } from 'react';

const ChatListPage = () => {
  const {
    connect,
    disconnect,
    chatList,
    subscribeToChatList,
    unSubscribeFromChatList,
    isConnected,
  } = useWebSocketStore();
  const { user } = useAuthStore();
  const myId = user?.userId;

  useEffect(() => {
    if (user) {
      connect({ userId: myId });
    }
    return () => {
      disconnect();
    };
  }, [user, connect, disconnect, myId]);

  useEffect(() => {
    if (isConnected && user) {
      subscribeToChatList(myId);
    }
  }, [isConnected, myId, subscribeToChatList, user]);

  console.log('chatList: ', chatList);

  return (
    <div className="flex-1">
      <BackBtnHeader title="메시지" />
      <ChatContainer>
        <ChatItem
          chatId="1-12"
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={false}
        />
        <ChatItem
          chatId="2-12"
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={true}
        />
        <ChatItem
          chatId="3-12"
          profileImgUrl="public/icon-32x32.png"
          username="User Kim"
          lastMessage="Last messagedfsersdfasefsdfsfefasdfefsfsefsfsf..."
          lastUpdatedDate="2024-01-03"
          read={false}
        />
        <ChatItem
          chatId="4-13"
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
