import ChatItem from './components/ChatItem';
import ChatContainer from './components/ChatContainer';
import useAuthStore from '@/store/useAuthStore';
import useWebSocketStore from '@/store/useWebsocketStore';
import { useEffect } from 'react';
import { convertImgSrcToHTTPS } from '@/lib/helpers';
import SplashGirl from '@/assets/splash-girl2.png';
import SplashSun from '@/assets/splash-sun.png';
import Navbar from '@/components/NalSeeNavbar';

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
        <Navbar />
        <div className="flex-1">
          <div className="relative flex h-[calc(100dvh-155px)] items-center justify-center overflow-hidden bg-gradient-to-b from-blue-300 ">
            <img
              className="absolute right-0 top-[109.70px] h-60 w-40 origin-top-left rotate-[-46.01deg]"
              src={SplashSun}
              alt="splash-sun"
            />
            <p className="absolute inset-x-0 top-[270px] mx-auto h-20 w-[74.10px] text-lg font-extrabold text-card">
              메시지가 없습니다
            </p>

            <div className="absolute left-[-52px] top-[438px] h-[631px] w-[271.57px] overflow-hidden">
              <img
                src={SplashGirl}
                alt="splash-girl"
                className="size-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Navbar />
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
