import { SearchableDocument } from '../aggregates/searchableDocument.aggregate';

export const ISearchableDocumentRepoToken = Symbol('IDocumentRepo');

export interface ISearchableDocumentRepo {
  save(searchableDocument: SearchableDocument): Promise<void>;
}
