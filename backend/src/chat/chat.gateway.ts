// chat.gateway.ts
// import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
// import { Server } from 'socket.io';

// @WebSocketGateway({ cors: true })
// export class ChatGateway {
//   @WebSocketServer()
//   server: Server;

//   @SubscribeMessage('message')
//   handleMessage(@MessageBody() message: any) {
//     // Broadcast new message to all clients in the chat room
//     this.server.to(`chat_${message.chatId}`).emit('newMessage', message);
//   }
// }

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Optional: Track connected users
  private activeUsers: Map<number, string> = new Map(); // userId => socket.id

  // Handle client connection
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Handle client disconnect
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Remove from activeUsers map if needed
  }

  /**
   * Client can join a chat room
   * Expects payload: { chatId: number }
   */
  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody() payload: { chatId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `chat_${payload.chatId}`;
    client.join(room);
    console.log(`Socket ${client.id} joined room ${room}`);
  }

  /**
   * Handle sending message from client
   * Expects payload: { chatId: number, content: string, senderId?: number }
   * Typically senderId comes from server (JWT) for security
   */
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { chatId: number; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `chat_${message.chatId}`;
    // Broadcast to all clients in the room except sender
    client.to(room).emit('newMessage', message);
  }
}
