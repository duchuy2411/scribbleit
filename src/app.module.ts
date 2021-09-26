import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '@users/user.module';
import { AuthModule } from '@auth/auth.module';
import { BoardModule } from '@/board/board.module';
import { AuthController } from '@auth/auth.controller';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BoardModule,
    MongooseModule.forRoot('mongodb://localhost:27017/newdb'),
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
