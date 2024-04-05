// useChatListWebSocket.ts
import { useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import useAuthStore from '@/store/useAuthStore';

interface ChatItem {
  chatId: string;
  lastMessage: string;
  // 필요한 다른 속성들 추가
}

const useChatListWebSocket = () => {
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const stompClientRef = useRef<Client | null>(null);
  const { user } = useAuthStore();
  const myId = user?.userId;

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws://nalsee.site:8090//main',
      connectHeaders: {},
      debug: function () {
        // console.log('websocket debug->', str);
      },
      onConnect: () => {
        console.log('stomp 연결성공 (채팅 목록)');

        // 채팅 목록 구독
        stompClient.subscribe(
          `/user/queue/sub/chat-list/${myId}`,
          (message: IMessage) => {
            const receivedChatList = JSON.parse(message.body);
            setChatList(receivedChatList);
          },
        );

        // 서버에 구독 요청
        stompClient.publish({
          destination: `/app/chat-list/${myId}`,
          body: JSON.stringify({ myId }),
        });
      },
      onDisconnect: () => {
        console.log('WebSocket 연결 해제됨 (채팅 목록)');
      },
      onStompError: () => {
        console.log('STOMP Error 발생 (채팅 목록)');
      },
    });

    stompClientRef.current = stompClient;
    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [myId]);

  return { chatList };
};

export default useChatListWebSocket;
