import { Injectable } from '@nestjs/common';
import { DomainEvent } from 'src/shared/domain/base.event';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IEventBus } from '../eventBus.service.interface';

@Injectable()
export class RabbitMQEventBus implements IEventBus {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly exchangeName: string,
  ) {}

  async publish(event: DomainEvent): Promise<void> {
    await this.amqpConnection.publish(
      this.exchangeName,
      event.getEventName(),
      event,
    );
  }

  async publishAll(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }
}
