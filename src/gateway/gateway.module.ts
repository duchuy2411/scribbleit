import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { EventsGateway } from './gateway';

@Module({
  providers: [EventsGateway],
})
export class GatewayModule {};
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(cors())
//       .forRoutes('')
//   }
// };
