import { Inject, Injectable } from '@nestjs/common';
import { ISearchableDocumentRepo } from '../domain/repos/searchableDocument.repo.interface';
import { ISearchEngineServiceToken } from 'src/shared/infra/searchEngine/searchEngine.service.interface';
import { ElasticsearchService } from 'src/shared/infra/searchEngine/elasticsearch/elasticsearch.service';
import { SearchableDocument } from '../domain/aggregates/searchableDocument.aggregate';

const SEARCHABLE_DOCUMENT_INDEX = 'searchable_documents';

@Injectable()
export class ElasticsearchSearchableDocumentRepo implements ISearchableDocumentRepo {
  constructor(
    @Inject(ISearchEngineServiceToken)
    private readonly searchEngineService: ElasticsearchService,
  ) {}

  private get client() {
    return this.searchEngineService.getClient();
  }

  async save(searchableDocument: SearchableDocument): Promise<void> {
    await this.client.index({
      index: SEARCHABLE_DOCUMENT_INDEX,
      id: searchableDocument.id,
      document: {
        documentId: searchableDocument.documentId,
        name: searchableDocument.name,
        createdAt: searchableDocument.createdAt,
      },
    });
  }
}
