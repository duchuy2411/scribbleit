import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RedisIoAdapter } from './gateway';

@Module({
  providers: [RedisIoAdapter],           
})
export class GatewayModule {};
