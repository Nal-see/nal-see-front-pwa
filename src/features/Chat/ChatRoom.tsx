// ChatRoomPage.tsx
import { useEffect, useRef, useState } from 'react';
import BackBtnHeader from '@/components/BackBtnHeader';
import { Input } from '@/components/ui/input';
import useAuthStore from '@/store/useAuthStore';
import ChatBubble from './components/ChatBubbleProps';
import { StyledForm, UserImage } from '../Feed/components/comment/commentStyle';
import useWebSocketStore from '@/store/useWebsocketStore';
import { useNavigate, useParams } from 'react-router-dom';
import { convertImgSrcToHTTPS } from '@/lib/helpers';
import { FiSend } from 'react-icons/fi';
import { exitChat } from './services/chatApi';
import { ImExit } from 'react-icons/im';
import { toast } from 'sonner';

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
  const isReadOnly =
    messages[0]?.sender == '탈퇴한 사용자' ||
    messages[0]?.receiver == '탈퇴한 사용자';

  const navigate = useNavigate();
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
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    console.log(isConnected);
    const fetchMessages = async () => {
      if (chatId && myId && isConnected) {
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

  const confirmExit = () => {
    toast('⛅︎ 채팅방을 정말 나가시겠습니까?', {
      duration: 10000,
      action: {
        label: '나가기',
        onClick: () => handleExitChat(),
      },
      actionButtonStyle: {
        background: 'var(--accent)',
      },
    });
  };
  const handleExitChat = () => {
    if (!chatId) return;
    exitChat(chatId);
    navigate('/chat');
  };

  return (
    <div className="relative flex h-screen flex-1 flex-col overflow-y-scroll">
      <BackBtnHeader title="메시지" />
      <div className="flex-1 overflow-y-auto px-3">
        {messages.map((data, index) => (
          <ChatBubble
            key={index}
            msg={data.msg}
            senderId={data.senderId}
            receiverImage={data.senderImg}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="absolute right-4 top-0">
        <ImExit
          className="mr-2 mt-3 items-center justify-center bg-white text-secondary"
          size={24}
          onClick={confirmExit}
        />
      </div>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <UserImage
          src={
            myImage
              ? convertImgSrcToHTTPS(myImage)
              : '/src/assets/weatherImage/placeholder.jpg'
          }
        />
        <Input
          type="text"
          value={message}
          onChange={(e) => {
            console.log('e.value: ', e.target.value);
            setMessage(e.target.value);
          }}
          placeholder={
            isReadOnly
              ? '탈퇴한 사용자입니다. 메시지를 보낼 수 없습니다.'
              : '메시지를 입력해주세요.'
          }
          className="ml-3 rounded-full text-base"
          disabled={isReadOnly}
        />
        <button
          type="submit"
          className="ml-3 rounded-full bg-accent p-2 text-white active:bg-sky-500"
          disabled={isReadOnly}
        >
          <FiSend size={24} />
        </button>
      </StyledForm>
    </div>
  );
};

export default ChatRoomPage;
