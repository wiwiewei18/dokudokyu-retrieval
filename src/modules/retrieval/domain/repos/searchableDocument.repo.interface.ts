import { SearchableDocument } from '../aggregates/searchableDocument.aggregate';

export interface SearchDocumentsParams {
  keyword: string;
  page: number;
  size: number;
}

export interface SearchDocumentsResult {
  total: number;
  documents: Array<{
    documentId: string;
    name?: string;
    extractedContent?: string;
    summary?: string;
  }>;
}

export const ISearchableDocumentRepoToken = Symbol('IDocumentRepo');

export interface ISearchableDocumentRepo {
  findByDocumentId(documentId: string): Promise<SearchableDocument | null>;
  save(searchableDocument: SearchableDocument): Promise<void>;
  search(params: SearchDocumentsParams): Promise<SearchDocumentsResult>;
}
