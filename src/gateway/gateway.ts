import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class RedisIoAdapter implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  clients: any[];

  constructor(){
    this.clients = [];
  }

  handleConnection(client: any) {
    console.log("client:", client.id);
    this.clients.push(client);
    // on authenticate
    client.emit('authenticate', client.id);
    return client;
  }

  @SubscribeMessage('disconnecting')
  disconnet(@ConnectedSocket() socket: Socket): any {
    console.log("disconnect:", socket.id);
    for (let i = 0; this.clients.length; i += 1) {
      if (this.clients[i].id === socket.id) {
        this.clients.splice(i, 1);
      }
    }
    return socket;
  }

  @SubscribeMessage('startDraw')
  async sendDraw(@MessageBody() data: any): Promise<any> {
    for (let i of this.clients) {
      if (i.id !== data.socketId) {
        console.log('id:', i.id)
        const dataSend = { x: data.x, y: data.y };
        i.emit('sendStart', dataSend);
      }
    }
    return data;
  }

  @SubscribeMessage('drawing')
  async sendDrawing(@MessageBody() data: any): Promise<any> {
    for (let i of this.clients) {
      if (i.id !== data.socketId) {
        console.log('id:', i.id)
        const dataSend = { x: data.x, y: data.y };
        i.emit('sendDrawing', dataSend);
      }
    }
    return data;
  }

  @SubscribeMessage('endDraw')
  async sendEndDraw(@MessageBody() data: any): Promise<any> {
    for (let i of this.clients) {
      if (i.id !== data.socketId) {
        console.log('id:', i.id)
        i.emit('sendEnd', {});
      }
    }
    return data;
  }
}