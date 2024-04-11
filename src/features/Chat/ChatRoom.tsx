// ChatRoomPage.tsx
import { useEffect, useRef, useState } from 'react';
import BackBtnHeader from '@/components/BackBtnHeader';
import { Input } from '@/components/ui/input';
import useAuthStore from '@/store/useAuthStore';
import ChatBubble from './components/ChatBubbleProps';
import { StyledForm, UserImage } from '../Feed/components/comment/commentStyle';
import useWebSocketStore from '@/store/useWebsocketStore';
import { useParams } from 'react-router-dom';

const ChatRoomPage = () => {
  const { user } = useAuthStore();
  const {
    connect,
    disconnect,
    sendMessage,
    messages,
    setMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
    isConnected,
  } = useWebSocketStore();
  const chatId = useParams().chatId;
  const myId = user?.userId;
  const myImage = user?.picture;
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      connect();
      console.log('웹소켓 기본 주소 연결성공');
    }
    return () => {
      disconnect();
    };
  }, [user, connect, disconnect]);

  useEffect(() => {
    console.log(isConnected);
    const fetchMessages = async () => {
      if (chatId && myId && isConnected) {
        console.log('채팅방 구독하고 메시지 가져오기');
        await subscribeToMessages(chatId);
        await setMessages(chatId);
      }
    };

    fetchMessages();

    return () => {
      if (chatId) {
        unSubscribeFromMessages(chatId);
      }
    };
  }, [
    chatId,
    isConnected,
    myId,
    setMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
  ]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(String(chatId), message);
      setMessage('');
    }
  };

  const dummyData = [
    {
      id: 1,
      chatId: '1-12',
      msg: 'Hello',
      senderId: 1,
      sender: '송한호',
      senderImg: 'https://placeholder.co/50x50',
      createAt: '2021-09-01T00:00:00',
    },
    {
      id: 2,
      chatId: '1-12',
      msg: 'Hi',
      senderId: 2,
      sender: '송한호',
      senderImg: 'https://placeholder.co/50x50',
      createAt: '2021-09-01T00:00:00',
    },
    {
      id: 3,
      chatId: '1-12',
      msg: 'How are you?',
      senderId: 1,
      sender: '송한호',
      senderImg: 'https://placeholder.co/50x50',
      createAt: '2021-09-01T00:00:00',
    },
    {
      id: 4,
      chatId: '1-12',
      msg: 'I am fine',
      senderId: 13,
      sender: '송한호',
      senderImg: 'https://placeholder.co/50x50',
      createAt: '2021-09-01T00:00:00',
    },
  ];

  return (
    <div className="flex h-screen flex-1 flex-col overflow-y-scroll">
      <BackBtnHeader title="Chat Room" />
      <div className="flex-1 overflow-y-auto">
        {dummyData.map((data, index) => (
          <ChatBubble
            key={index}
            content={data.msg}
            senderId={data.senderId}
            receiverImage={data.senderImg}
            myId={myId}
            name={data.sender}
          />
        ))}
        {messages.map((data, index) => (
          <ChatBubble
            key={index}
            content={data.content}
            name={data.name}
            senderId={data.userId}
            receiverImage={data.senderImg}
            myId={myId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <UserImage src={myImage} />
        <Input
          type="text"
          value={message}
          onChange={(e) => {
            console.log('e.value: ', e.target.value);
            setMessage(e.target.value);
          }}
          placeholder="댓글을 입력해주세요."
          className="ml-3 rounded-full"
        />
      </StyledForm>
    </div>
  );
};

export default ChatRoomPage;
