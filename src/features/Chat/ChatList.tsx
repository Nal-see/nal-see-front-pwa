import BackBtnHeader from '@/components/BackBtnHeader';
import ChatItem from './components/ChatItem';
import ChatContainer from './components/ChatContainer';
import useAuthStore from '@/store/useAuthStore';
import useWebSocketStore from '@/store/useWebsocketStore';
import { useEffect } from 'react';
import { PiCloudFogFill } from 'react-icons/pi';
import { convertImgSrcToHTTPS } from '@/lib/helpers';

const ChatListPage = () => {
  const {
    connect,
    disconnect,
    chatList,
    setChatList,
    subscribeToChatList,
    unSubscribeFromChatList,
    isConnected,
    onLineStatus,
    onLineUsers,
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
    console.log('onLineStatus: ', onLineStatus);
    console.log('onLineUsers: ', onLineUsers);
  }, [chatList, onLineStatus, onLineUsers]);

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
            profileImgUrl={convertImgSrcToHTTPS(
              myId == chat.senderId ? chat.receiverImg : chat.senderImg,
            )}
            username={myId == chat.senderId ? chat.receiver : chat.sender}
            lastMessage={chat.msg}
            lastUpdatedDate={chat.createAt}
            readCnt={chat.readCnt}
            senderId={chat.senderId}
          />
        ))}
      </ChatContainer>
    </div>
  );
};

export default ChatListPage;
