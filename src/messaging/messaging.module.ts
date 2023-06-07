import { Module } from '@nestjs/common';
import { TransaccionPublisher } from './publisher/transaccion.publisher';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSACTION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'hero',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'hero-consumer',
          },
        },
      },
    ]),
  ],
  providers: [TransaccionPublisher],
  exports: [TransaccionPublisher],
})
export class MessagingModule {}
