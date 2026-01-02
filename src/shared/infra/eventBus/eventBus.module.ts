import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { IEventBusToken } from './eventBus.service.interface';
import { RabbitMQEventBus } from './rabbitMQ/rabbitMQEventBus.service';

@Module({})
export class EventBusModule {
  static forRoot(exchangeName: string): DynamicModule {
    if (!exchangeName) {
      throw new Error('Exchange name must be provided');
    }

    return {
      module: EventBusModule,
      imports: [
        RabbitMQModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const uri = configService.get<string>('rabbitmq.uri');

            return {
              exchanges: [{ name: exchangeName, type: 'topic' }],
              uri,
              connectionInitOptions: { wait: true },
            };
          },
        }),
      ],
      providers: [
        {
          provide: IEventBusToken,
          inject: [AmqpConnection],
          useFactory: (amqpConnection: any) => {
            return new RabbitMQEventBus(amqpConnection, exchangeName);
          },
        },
      ],
      exports: [IEventBusToken],
    };
  }
}
