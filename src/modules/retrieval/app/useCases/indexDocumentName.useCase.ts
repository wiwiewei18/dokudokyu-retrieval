import { Inject, Injectable } from '@nestjs/common';
import {
  type ISearchableDocumentRepo,
  ISearchableDocumentRepoToken,
} from '../../domain/repos/searchableDocument.repo.interface';
import { SearchableDocument } from '../../domain/aggregates/searchableDocument.aggregate';

export interface IndexDocumentNameInput {
  documentId: string;
  name: string;
}

@Injectable()
export class IndexDocumentNameUseCase {
  constructor(
    @Inject(ISearchableDocumentRepoToken)
    private readonly searchableDocumentRepo: ISearchableDocumentRepo,
  ) {}

  async execute(input: IndexDocumentNameInput): Promise<void> {
    const searchableDocument = SearchableDocument.create({
      documentId: input.documentId,
      name: input.name,
    });

    await this.searchableDocumentRepo.save(searchableDocument);
  }
}
