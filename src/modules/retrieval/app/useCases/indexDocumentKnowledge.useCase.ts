import { Inject, Injectable } from '@nestjs/common';
import {
  type ISearchableDocumentRepo,
  ISearchableDocumentRepoToken,
} from '../../domain/repos/searchableDocument.repo.interface';
import { SearchableDocument } from '../../domain/aggregates/searchableDocument.aggregate';

export interface IndexDocumentKnowledgeInput {
  documentId: string;
  extractedContent: string;
  summary: string;
}

@Injectable()
export class IndexDocumentKnowledgeUseCase {
  constructor(
    @Inject(ISearchableDocumentRepoToken)
    private readonly searchableDocumentRepo: ISearchableDocumentRepo,
  ) {}

  async execute(input: IndexDocumentKnowledgeInput): Promise<void> {
    const searchableDocument = SearchableDocument.create({
      documentId: input.documentId,
      extractedContent: input.extractedContent,
      summary: input.summary,
    });

    await this.searchableDocumentRepo.save(searchableDocument);
  }
}
