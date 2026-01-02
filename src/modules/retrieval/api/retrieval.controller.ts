import { Controller, Get, Query } from '@nestjs/common';
import { SearchDocumentListUseCase } from '../app/useCases/searchDocumentList.useCase';

@Controller('retrieval')
export class RetrievalController {
  constructor(
    private readonly searchDocumentListUseCase: SearchDocumentListUseCase,
  ) {}

  @Get()
  async search(
    @Query('q') keyword: string,
    @Query('page') page?: number,
    @Query('size') size?: number,
  ) {
    return this.searchDocumentListUseCase.execute({
      keyword,
      page: page ? Number(page) : undefined,
      size: size ? Number(size) : undefined,
    });
  }
}
