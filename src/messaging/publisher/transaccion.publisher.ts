import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TransaccionPublisher<T> {
  constructor(
    @Inject('TRANSACTION_SERVICE')
    private readonly clientProxy: ClientProxy,
  ) {}

  publish(data: T): void {
    this.clientProxy.emit('TRANSACTION_CREATED', JSON.stringify(data));
  }
}
