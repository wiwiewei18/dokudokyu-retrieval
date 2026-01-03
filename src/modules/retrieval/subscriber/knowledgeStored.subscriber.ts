import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { IndexDocumentKnowledgeUseCase } from '../app/useCases/indexDocumentKnowledge.useCase';

@Injectable()
export class KnowledgeStoredSubscriber {
  constructor(
    private readonly indexDocumentKnowledgeUseCase: IndexDocumentKnowledgeUseCase,
  ) {}

  @RabbitSubscribe({
    exchange: 'knowledge.exchange',
    routingKey: 'knowledge.stored',
    queue: 'retrieval.index-document-knowledge',
  })
  async handle(event: {
    documentId: string;
    extractedContent: string;
    summary: string;
  }) {
    await this.indexDocumentKnowledgeUseCase.execute({
      documentId: event.documentId,
      extractedContent: event.extractedContent,
      summary: event.summary,
    });
  }
}
