import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TransaccionPublisher } from './messaging/publisher/transaccion.publisher';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventPublish: TransaccionPublisher<string>,
  ) {}
  //eventPublisher
  @Post()
  event() {
    this.eventPublish.publish('Claro eso era!!');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //subscriber
  @EventPattern('TRANSACTION_CREATED')
  subscriber(@Payload() data: string, @Ctx() context: KafkaContext) {
    console.log(data);
    console.log(context);
  }
}
