import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ISearchEngineServiceToken } from './searchEngine.service.interface';
import { ElasticsearchService } from './elasticsearch/elasticsearch.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: ISearchEngineServiceToken,
      useClass: ElasticsearchService,
    },
  ],
  exports: [ISearchEngineServiceToken],
})
export class SearchEngineModule {}
