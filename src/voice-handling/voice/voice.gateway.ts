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

  @SubscribeMessage('call')
  handleCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): void {
    console.log('socket on call');
    const calleeId = data.calleeId;
    const rtcMessage = data.rtcMessage;

    client.to(calleeId).emit('newCall', {
      callerId: client.id,
      rtcMessage: rtcMessage,
    });
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
    console.log('ICEcandidate data.calleeId', data.calleeId);
    const calleeId = data.calleeId;
    const rtcMessage = data.rtcMessage;

    client.to(calleeId).emit('ICEcandidate', {
      sender: client.id,
      rtcMessage: rtcMessage,
    });
  }
}
