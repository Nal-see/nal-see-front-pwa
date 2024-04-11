// useWebSocketStore.ts
import { WebSocketService } from '@/features/Chat/services/WebSocketService';
import { create } from 'zustand';
import useAuthStore from './useAuthStore';
import { getChatList, getChatMesg } from '@/features/Chat/services/chatApi';

interface ChatItem {
  id: string;
  chatId: string;
  createAt: string;
  msg: string;
  sender: string;
  senderId: string;
  senderImg: string;
  receiver: string;
  receiverId: string;
  receiverImg: string;
  // 필요한 다른 속성들 추가
}

interface Message {
  id: string;
  createAt: string;
  msg: string;
  sender: string;
  senderId: string;
  senderImg: string;
}

interface WebSocketState {
  webSocketService: WebSocketService | null;
  isConnected: boolean;
  chatList: ChatItem[];
  messages: Message[];
  setMessages: (chatId: string) => void;
  setChatList: () => void;
  connect: () => void;
  disconnect: () => void;
  subscribeToChatList: (userId: string) => void;
  unSubscribeFromChatList: (userId: string) => void;
  subscribeToMessages: (chatId: string) => void;
  unSubscribeFromMessages: (chatId: string) => void;
  sendMessage: (chatId: string, content: string) => void;
}

const useWebSocketStore = create<WebSocketState>((set, get) => ({
  webSocketService: null,
  isConnected: false,
  chatList: [],
  messages: [],
  setMessages: async (chatId: string) => {
    const userId = useAuthStore.getState().user?.userId;
    if (userId) {
      const messages = await getChatMesg(chatId);
      console.log('메세지 가져오기 성공', messages);
      set({ messages });
    }
  },
  setChatList: async () => {
    const userId = useAuthStore.getState().user?.userId;
    if (userId) {
      const chatList = await getChatList();
      set({ chatList });
    }
  },
  connect: async () => {
    const webSocketService = new WebSocketService();
    webSocketService.client.onConnect = () => {
      console.log('연결성공하였습니다.');
      set({ isConnected: true });

      webSocketService.subscriptions.forEach((sub) => {
        webSocketService.client.subscribe(sub.destination, sub.callback);
      });
    };

    webSocketService.client.onDisconnect = () => {
      set({ isConnected: false });
      console.log('연결이 끊어졌습니다. 재연결을 시도합니다.');
      // 재연결 로직 추가
      webSocketService.activate();
    };

    set({ webSocketService, isConnected: false });
    webSocketService.activate();
  },
  disconnect: () => {
    set((state) => {
      state.webSocketService?.disconnect();
      return { webSocketService: null, isConnected: false };
    });
  },
  subscribeToChatList: async (userId: string) => {
    const { webSocketService } = get();
    console.log('webSocketService: adsdads', webSocketService);
    if (webSocketService && useWebSocketStore.getState().isConnected) {
      console.log('된거임?');
      webSocketService.subscribeToDestination(
        `/sub/${userId}/chat-list`,
        (message) => {
          const receivedChatList = JSON.parse(message.body);
          set({ chatList: receivedChatList });
        },
      );
      webSocketService.publishMessage(`/app/chat-list/${userId}`, { userId });
    }
  },
  unSubscribeFromChatList: async (userId: string) => {
    const { webSocketService } = get();
    if (webSocketService) {
      webSocketService.client.unsubscribe(`/sub/${userId}/chat-list`);
    }
  },
  subscribeToMessages: async (chatId: string) => {
    const userId = useAuthStore.getState().user?.userId;
    if (!userId || !chatId.includes(userId)) console.log('Invalid chatId');
    const { webSocketService } = get();
    if (webSocketService && useWebSocketStore.getState().isConnected) {
      webSocketService.subscribeToDestination(
        `/sub/${chatId}/chat`,
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log('receivedMessage: ', receivedMessage);
          set((state) => ({
            messages: [...state.messages, receivedMessage],
          }));
        },
      );
      console.log('방구독 성공');
    }
  },
  unSubscribeFromMessages: async (chatId: string) => {
    const { webSocketService } = get();
    if (webSocketService) {
      webSocketService.client.unsubscribe(`/sub/${chatId}/chat`);
    }
  },
  sendMessage: async (chatId: string, content: string) => {
    const { webSocketService } = get();
    const userId = useAuthStore.getState().user?.userId;
    const receiverId = chatId.replace(String(userId), '').replace('-', '');

    if (webSocketService) {
      const newMessage = {
        receiverId,
        content: content,
      };
      webSocketService.publishMessage(`/pub/${chatId}/chat`, newMessage, {
        chatId,
      });
      console.log('메세지 전송 성공', newMessage);
    }
  },
}));

export default useWebSocketStore;
