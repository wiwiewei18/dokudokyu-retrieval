import { ConfigService } from '@nestjs/config';

export function createCorsConfig(configService: ConfigService) {
  return {
    origins: configService.get<string[]>('cors.origins'),
    credentials: configService.get<boolean>('cors.credentials'),
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  };
}
