import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('ChatGateway');

  @WebSocketServer() wss: Server;

  afterInit(server: any) {
    this.logger.log('Initialize ChatGateway!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chatToServer')
  handleChatMessage(
    client: Socket,
    payload: { sender: string; room: string; message: string },
  ) {
    this.logger.log(payload);
    this.wss.to(payload.room).emit('chatToClient', { ...payload, id: randomUUID() });
  }

  @SubscribeMessage('deleteChatToServer')
  handleDeleteChatMessage(
    client: Socket,
    payload: { id: string, room: string},
  ) {
    this.logger.log(payload);
    this.wss.to(payload.room).emit('deleteChatToClient', payload);
  }

  @SubscribeMessage('editChatToServer')
  handleEditChatMessage(
    client: Socket,
    payload: { id: string, room: string, message: string},
  ) {
    this.logger.log(payload);
    this.wss.to(payload.room).emit('editChatToClient', payload);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeftRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
