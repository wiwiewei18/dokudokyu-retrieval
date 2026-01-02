import { Module } from '@nestjs/common';
import { SearchEngineModule } from 'src/shared/infra/searchEngine/searchEngine.module';

@Module({
  imports: [SearchEngineModule],
})
export class RetrievalModule {}
