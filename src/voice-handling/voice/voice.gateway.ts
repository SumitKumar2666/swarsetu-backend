import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@WebSocketGateway()
export class VoiceGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server: Server;
  broadcaster: string;

  afterInit() {
    console.log('WebSocket initialized');
  }

  handleConnection(client: Socket) {
    if (client.handshake.query) {
      const callerId = client.handshake.query.callerId;
      client.join(callerId);
      client.emit('message', { some: 'abs' });
      console.log(`${callerId} connected`);
    }
  }

  @SubscribeMessage('makeCall')
  handleCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): void {
    try {
      console.log('data', data);
      const calleeId = data.calleeId;
      const rtcMessage = data.rtcMessage;

      client.to(calleeId).emit('newCall', {
        callerId: client.id,
        rtcMessage: rtcMessage,
      });
    } catch (error) {
      console.log('error is makeCall', error);
    }
  }

  @SubscribeMessage('answerCall')
  handleAnswerCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): void {
    console.log('socket on answer call');
    const callerId = data.callerId;
    const rtcMessage = data.rtcMessage;

    client.to(callerId).emit('callAnswered', {
      callee: client.id,
      rtcMessage: rtcMessage,
    });
  }

  @SubscribeMessage('ICEcandidate')
  handleICECandidate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): void {
    console.log('ICEcandidate ', data);
    const calleeId = data.calleeId;
    const rtcMessage = data.rtcMessage;

    client.to(calleeId).emit('ICEcandidate', {
      sender: client.id,
      rtcMessage: rtcMessage,
    });
  }

  @SubscribeMessage('broadcaster')
  handleBroadcaster(@ConnectedSocket() client: Socket): void {
    this.broadcaster = client.id;
    client.broadcast.emit('broadcaster');
  }

  @SubscribeMessage('watcher')
  handleWatcher(@ConnectedSocket() client: Socket): void {
    client.to(this.broadcaster).emit('watcher', client.id);
  }
  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() client: Socket): void {
    client.to(this.broadcaster).emit('disconnectPeer', client.id);
  }

  @SubscribeMessage('offer')
  handleOffer(
    @ConnectedSocket() client: Socket,
    id: string,
    message: any,
  ): void {
    client.to(id).emit('offer', client.id, message);
  }

  @SubscribeMessage('answer')
  handleAnswer(
    @ConnectedSocket() client: Socket,
    id: string,
    message: any,
  ): void {
    client.to(id).emit('answer', client.id, message);
  }

  @SubscribeMessage('candidate')
  handleCandidate(
    @ConnectedSocket() client: Socket,
    id: string,
    message: any,
  ): void {
    client.to(id).emit('candidate', client.id, message);
  }

  @SubscribeMessage('comment')
  handleComment(
    @ConnectedSocket() client: Socket,
    id: string,
    message: any,
  ): void {
    client.to(id).emit('comment', client.id, message);
  }
}
