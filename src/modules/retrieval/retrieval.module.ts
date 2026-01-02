import { Module } from '@nestjs/common';
import { SearchEngineModule } from 'src/shared/infra/searchEngine/searchEngine.module';
import { IndexDocumentNameUseCase } from './app/useCases/indexDocumentName.useCase';
import { DocumentUploadedSubscriber } from './subscriber/documentUploaded.subscriber';
import { ISearchableDocumentRepoToken } from './domain/repos/searchableDocument.repo.interface';
import { ElasticsearchSearchableDocumentRepo } from './infra/repos/elasticsearchSearchableDocument.repo';
import { EventBusModule } from 'src/shared/infra/eventBus/eventBus.module';
import { KnowledgeStoredSubscriber } from './subscriber/knowledgeStored.subscriber';
import { IndexDocumentKnowledgeUseCase } from './app/useCases/indexDocumentKnowledge.useCase';

@Module({
  imports: [SearchEngineModule, EventBusModule.forRoot('retrieval.exchange')],
  providers: [
    {
      provide: ISearchableDocumentRepoToken,
      useClass: ElasticsearchSearchableDocumentRepo,
    },

    IndexDocumentNameUseCase,
    IndexDocumentKnowledgeUseCase,

    DocumentUploadedSubscriber,
    KnowledgeStoredSubscriber,
  ],
})
export class RetrievalModule {}
