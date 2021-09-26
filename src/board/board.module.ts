import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@auth/auth.module';
import { AuthMiddleWare } from '@auth/auth.middleware';
import { User, UserSchema } from '@mongo/schema/users';
import { Board, BoardSchema } from '@mongo/schema/boards';
import { UserModule } from '@users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Board.name, schema: BoardSchema },
    ]),
    UserModule,
    AuthModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService]
})
export class BoardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .forRoutes('boards')
  }
}
