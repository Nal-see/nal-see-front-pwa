// ChatRoomPage.tsx
import { useEffect, useState } from 'react';
import BackBtnHeader from '@/components/BackBtnHeader';
import { Input } from '@/components/ui/input';
import useAuthStore from '@/store/useAuthStore';
import ChatBubble from './components/ChatBubbleProps';
import { StyledForm, UserImage } from '../Feed/components/comment/commentStyle';
import useWebSocketStore from '@/store/useWebsocketStore';
import { useParams } from 'react-router-dom';

const ChatRoomPage = () => {
  const { sendMessage } = useWebSocketStore();
  const chatId = useParams().chatId;
  const { user } = useAuthStore();
  const myId = user?.userId;
  const myImage = user?.picture;
  const [message, setMessage] = useState('');
  console.log('myId: ', myId);

  useEffect(() => {
    useWebSocketStore.getState().subscribeToMessages(String(chatId));
  }, []);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(String(chatId), message);
      setMessage('');
    }
  };

  const dummyData = [
    {
      id: 1,
      content: 'Hello',
      senderId: 1,
      receiverImage: 'https://placeholder.co/50x50',
    },
    {
      id: 2,
      content: 'Hi',
      senderId: 2,
      receiverImage: 'https://placeholder.co/50x50',
    },
    {
      id: 3,
      content: 'How are you?',
      senderId: 1,
      receiverImage: 'https://placeholder.co/50x50',
    },
    {
      id: 4,
      content: 'I am fine',
      senderId: 13,
      receiverImage: 'https://placeholder.co/50x50',
    },
  ];
  return (
    <div className="flex h-screen flex-1 flex-col">
      <BackBtnHeader title="Chat Room" />
      <div className="flex-1 overflow-y-auto">
        {/* {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))} */}
        {dummyData.map((data, index) => (
          <ChatBubble
            key={index}
            content={data.content}
            senderId={data.senderId}
            receiverImage={data.receiverImage}
            myId={myId}
          />
        ))}
      </div>
      <StyledForm onSubmit={handleSendMessage}>
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
