import { Injectable } from '@nestjs/common';
import { IndexDocumentNameUseCase } from '../app/useCases/indexDocumentName.useCase';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class DocumentUploadedSubscriber {
  constructor(
    private readonly indexDocumentNameUseCase: IndexDocumentNameUseCase,
  ) {}

  @RabbitSubscribe({
    exchange: 'document.exchange',
    routingKey: 'document.uploaded',
    queue: 'retrieval.index-document-name',
  })
  async handle(event: { documentId: string; name: string }) {
    await this.indexDocumentNameUseCase.execute({
      documentId: event.documentId,
      name: event.name,
    });
  }
}
