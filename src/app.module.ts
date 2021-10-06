import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '@users/user.module';
import { AuthModule } from '@auth/auth.module';
import { BoardModule } from '@/board/board.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BoardModule,
    GatewayModule,
    MongooseModule.forRoot('mongodb://192.168.1.5:27017/newdb'),
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
