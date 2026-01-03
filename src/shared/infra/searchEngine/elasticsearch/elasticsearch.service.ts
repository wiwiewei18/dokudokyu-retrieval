import { Injectable } from '@nestjs/common';
import { ISearchEngineService } from '../searchEngine.service.interface';
import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticsearchService implements ISearchEngineService {
  private readonly client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      node: this.configService.get<string>('elasticsearch.url'),
    });
  }

  getClient(): Client {
    return this.client;
  }
}
