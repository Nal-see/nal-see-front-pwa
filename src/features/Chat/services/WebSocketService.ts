// WebSocketService.ts
import { Client, IMessage } from '@stomp/stompjs';

export interface WebSocketConnectOptions {
  token: string;
  userId: string;
}

export class WebSocketService {
  client: Client;
  subscriptions: Array<{
    destination: string;
    callback: (message: IMessage) => void;
  }> = [];

  constructor(options: WebSocketConnectOptions) {
    const { userId } = options;

    this.client = new Client({
      brokerURL: 'ws://localhost:8090/main',
      connectHeaders: {
        userId: userId,
      },
      debug: function () {
        // console.log('websocket debug->', str);
      },
      onConnect: () => {
        console.log('stomp 연결성공');
      },
      onDisconnect: () => {
        console.log('WebSocket 연결 해제됨');
      },
      onStompError: () => {
        console.log('STOMP Error 발생');
      },
    });
  }

  activate() {
    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }

  subscribeToDestination(
    destination: string,
    callback: (message: IMessage) => void,
  ) {
    this.subscriptions.push({ destination, callback });
    this.client.subscribe(destination, callback);
  }

  publishMessage(
    destination: string,
    body: any,
    headers?: { [key: string]: any },
  ) {
    this.client.publish({ destination, body: JSON.stringify(body), headers });
  }
}
