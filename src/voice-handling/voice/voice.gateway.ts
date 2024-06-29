import { WebSocketGateway, SubscribeMessage, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VoiceGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinCall')
  handleJoinCall(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }): void {
    client.join(data.roomId);
    console.log(`Client ${client.id} joined room ${data.roomId}`);
  }

  @SubscribeMessage('leaveCall')
  handleLeaveCall(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }): void {
    client.leave(data.roomId);
    console.log(`Client ${client.id} left room ${data.roomId}`);
  }

  @SubscribeMessage('sendAudio')
  handleSendAudio(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string, audioBuffer: Buffer }): void {
    this.server.to(data.roomId).emit('audioReceived', { audioBuffer: data.audioBuffer });
  }
}
