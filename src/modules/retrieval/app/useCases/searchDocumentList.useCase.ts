import { Inject, Injectable } from '@nestjs/common';
import {
  type ISearchableDocumentRepo,
  ISearchableDocumentRepoToken,
} from '../../domain/repos/searchableDocument.repo.interface';

export interface SearchDocumentListInput {
  keyword: string;
  page?: number;
  size?: number;
}

interface Document {
  documentId: string;
  name?: string;
  extractedContent?: string;
  summary?: string;
}

export interface SearchDocumentListOutput {
  total: number;
  documents: Document[];
}

@Injectable()
export class SearchDocumentListUseCase {
  constructor(
    @Inject(ISearchableDocumentRepoToken)
    private readonly searchableDocumentRepo: ISearchableDocumentRepo,
  ) {}

  async execute(
    input: SearchDocumentListInput,
  ): Promise<SearchDocumentListOutput> {
    const page = input.page ?? 1;
    const size = input.size ?? 10;

    return this.searchableDocumentRepo.search({
      keyword: input.keyword,
      page,
      size,
    });
  }
}
