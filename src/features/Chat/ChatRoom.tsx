// ChatRoomPage.tsx
import { useState } from 'react';
import useWebSocket from './hooks/useConnectWebsocket';
import BackBtnHeader from '@/components/BackBtnHeader';
import { Input } from '@/components/ui/input';
import useAuthStore from '@/store/useAuthStore';
import ChatBubble from './components/ChatBubbleProps';
import { StyledForm, UserImage } from '../Feed/components/comment/commentStyle';

const ChatRoomPage = () => {
  const chatId = '1';
  const userId = '1';
  const [message, setMessage] = useState('');
  const { messages, sendMessage } = useWebSocket(chatId, userId);
  const { user } = useAuthStore();
  const myId = user?.userId;
  const myImage = user?.picture;
  console.log('myId: ', myId);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };

  const dummyData = [
    {
      id: 1,
      content: 'Hello',
      senderId: 12,
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
      senderId: 12,
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
