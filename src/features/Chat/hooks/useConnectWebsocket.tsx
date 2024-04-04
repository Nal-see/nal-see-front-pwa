import { useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import useAuthStore from '@/store/useAuthStore';

const useWebSocket = (chatId: string) => {
  const [messages, setMessages] = useState<string[]>([]);
  const stompClientRef = useRef<Client | null>(null);
  const { user } = useAuthStore();
  const myId = user?.userId;

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8090/main',
      connectHeaders: {},
      debug: function () {
        // console.log('websocket debug->', str);
      },
      onConnect: () => {
        console.log('stomp 연결성공');

        // 메시지 구독
        stompClient.subscribe(
          `/user/queue/sub/messages`,
          (message: IMessage) => {
            const receivedMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [
              ...prevMessages,
              receivedMessage.content,
            ]);
          },
        );
      },
      onDisconnect: () => {
        console.log('WebSocket 연결 해제됨');
      },
      onStompError: () => {
        console.log('STOMP Error 발생');
      },
    });

    stompClientRef.current = stompClient;
    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, []);

  const sendMessage = (content: string) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      const newMessage = {
        chatId,
        sender: myId,
        content,
      };
      stompClientRef.current.publish({
        destination: `/pub/chat`,
        body: JSON.stringify(newMessage),
        headers: { chatId },
      });
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
