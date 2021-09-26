import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtService, JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { UserService } from '@users/user.service';
import { User, UserSchema } from '../mongo/schema/users';

@Module({
  imports: [
    JwtModule.register({
      secret: "HUY_DEP_TRY",
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
