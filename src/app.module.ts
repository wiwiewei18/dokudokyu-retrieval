import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { RetrievalModule } from './modules/retrieval/retrieval.module';

@Module({
  imports: [AppConfigModule, RetrievalModule],
})
export class AppModule {}
