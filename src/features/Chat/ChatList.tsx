import BackBtnHeader from '@/components/BackBtnHeader';
import ChatItem from './components/ChatItem';
import ChatContainer from './components/ChatContainer';
import useAuthStore from '@/store/useAuthStore';
import useWebSocketStore from '@/store/useWebsocketStore';
import { useEffect } from 'react';
import { PiCloudFogFill } from 'react-icons/pi';

const ChatListPage = () => {
  const {
    connect,
    disconnect,
    chatList,
    setChatList,
    subscribeToChatList,
    unSubscribeFromChatList,
    isConnected,
  } = useWebSocketStore();
  const { user } = useAuthStore();
  const myId = user?.userId;

  useEffect(() => {
    if (user) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [user, connect, disconnect, myId]);

  useEffect(() => {
    const fetchChatList = async () => {
      if (isConnected && user) {
        await subscribeToChatList(String(myId));
        await setChatList();
      }
    };

    fetchChatList();

    return () => {
      if (isConnected && user) {
        unSubscribeFromChatList(String(myId));
      }
    };
  }, [
    isConnected,
    myId,
    setChatList,
    subscribeToChatList,
    unSubscribeFromChatList,
    user,
  ]);

  useEffect(() => {
    console.log('chatList: ', chatList);
  }, [chatList]);

  if (!chatList) {
    return (
      <div className="flex-1">
        <BackBtnHeader title="메시지" />
        <div className="flex h-full items-center justify-center">
          <PiCloudFogFill className="size-10 animate-spin text-gray-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <ChatContainer>
        {chatList.map((chat, index) => (
          <ChatItem
            key={index}
            chatId={chat.chatId}
            profileImgUrl={chat.receiverImg}
            username={chat.receiver}
            lastMessage={chat.msg}
            lastUpdatedDate={chat.createAt}
            read={false}
          />
        ))}
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
      </ChatContainer>
    </div>
  );
};

export default ChatListPage;
