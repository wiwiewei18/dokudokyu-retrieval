import { Inject, Injectable } from '@nestjs/common';
import {
  ISearchableDocumentRepo,
  SearchDocumentsParams,
  SearchDocumentsResult,
} from '../../domain/repos/searchableDocument.repo.interface';
import { ISearchEngineServiceToken } from 'src/shared/infra/searchEngine/searchEngine.service.interface';
import { ElasticsearchService } from 'src/shared/infra/searchEngine/elasticsearch/elasticsearch.service';
import { SearchableDocument } from '../../domain/aggregates/searchableDocument.aggregate';

const SEARCHABLE_DOCUMENT_INDEX = 'searchable_documents';

interface SearchableDocumentSource {
  documentId: string;
  name: string;
  summary?: string;
  extractedContent?: string;
  createdAt: Date;
  highlights?: {
    name?: string[];
    summary?: string[];
    extractedContent?: string[];
  };
}

@Injectable()
export class ElasticsearchSearchableDocumentRepo implements ISearchableDocumentRepo {
  constructor(
    @Inject(ISearchEngineServiceToken)
    private readonly searchEngineService: ElasticsearchService,
  ) {}

  private get client() {
    return this.searchEngineService.getClient();
  }

  async findByDocumentId(
    documentId: string,
  ): Promise<SearchableDocument | null> {
    const result = await this.client.get<SearchableDocumentSource>({
      index: SEARCHABLE_DOCUMENT_INDEX,
      id: documentId,
    });

    if (!result.found || !result._source) {
      return null;
    }

    return SearchableDocument.fromPersistence({
      id: result._source.documentId,
      documentId: result._source.documentId,
      name: result._source.name,
      extractedContent: result._source.extractedContent,
      summary: result._source.summary,
      createdAt: result._source.createdAt,
    });
  }

  async save(searchableDocument: SearchableDocument): Promise<void> {
    await this.client.update({
      index: SEARCHABLE_DOCUMENT_INDEX,
      id: searchableDocument.documentId,
      doc: {
        documentId: searchableDocument.documentId,
        name: searchableDocument.name,
        extractedContent: searchableDocument.extractedContent,
        summary: searchableDocument.summary,
        createdAt: searchableDocument.createdAt,
      },
      doc_as_upsert: true,
    });
  }

  async search(params: SearchDocumentsParams): Promise<SearchDocumentsResult> {
    const { keyword, page, size } = params;

    const result = await this.client.search<SearchableDocumentSource>({
      index: SEARCHABLE_DOCUMENT_INDEX,
      from: (page - 1) * size,
      size,
      query: {
        multi_match: {
          query: keyword,
          fields: ['name^3', 'summary^2', 'extractedContent'],
        },
      },
      highlight: {
        pre_tags: ['<mark>'],
        post_tags: ['</mark>'],
        fields: {
          name: {},
          summary: {},
          extractedContent: {
            fragment_size: 150,
            number_of_fragments: 3,
          },
        },
      },
    });

    return {
      total:
        typeof result.hits.total === 'number'
          ? result.hits.total
          : (result.hits.total?.value ?? 0),
      documents: result.hits.hits.map((hit) => ({
        documentId: hit._source?.documentId!,
        name: hit._source?.name,
        extractedContent: hit._source?.extractedContent,
        summary: hit._source?.summary,
        highlights: hit.highlight,
      })),
    };
  }
}
