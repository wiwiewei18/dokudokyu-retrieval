export const ISearchEngineServiceToken = Symbol('ISearchEngineService');

export interface ISearchEngineService {
  getClient(): any;
}
