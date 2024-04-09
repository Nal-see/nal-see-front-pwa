// useWebSocketStore.ts
import {
  WebSocketConnectOptions,
  WebSocketService,
} from '@/features/Chat/services/WebSocketService';
import { create } from 'zustand';
import useAuthStore from './useAuthStore';

interface ChatItem {
  chatId: string;
  lastMessage: string;
  // 필요한 다른 속성들 추가
}

interface Message {
  chatId: string;
  sender: string;
  content: string;
}

interface WebSocketState {
  webSocketService: WebSocketService | null;
  isConnected: boolean;
  chatList: ChatItem[];
  messages: Message[];
  connect: (options: WebSocketConnectOptions) => void;
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
  connect: async (options) => {
    console.log('options: ', options);
    const webSocketService = new WebSocketService();
    webSocketService.client.onConnect = () => {
      console.log('연결성공하였습니다.');
      set({ isConnected: true });

      webSocketService.subscriptions.forEach((sub) => {
        webSocketService.client.subscribe(sub.destination, sub.callback);
      });
    };

    webSocketService.client.onDisconnect = () => {
      console.log('연결이 끊어졌습니다. 재연결을 시도합니다.');
      set({ isConnected: false });
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
    if (!userId || chatId.includes(userId)) console.log('Invalid chatId');
    const { webSocketService } = get();
    if (webSocketService && useWebSocketStore.getState().isConnected) {
      webSocketService.subscribeToDestination(
        `/sub/${chatId}/chat`,
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          set((state) => ({
            messages: [...state.messages, receivedMessage],
          }));
        },
      );
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
    if (!userId || chatId.includes(userId)) return;
    if (webSocketService) {
      const newMessage = {
        chatId,
        sender: userId,
        content,
      };
      webSocketService.publishMessage(`/pub/${chatId}/chat`, newMessage, {
        chatId,
      });
    }
  },
}));

export default useWebSocketStore;
