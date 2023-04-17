import { Module } from '@nestjs/common';
import { ApiModule } from 'src/api/api.module';
import { BrowseController } from './browse.controller';

@Module({
  imports: [ApiModule],
  controllers: [BrowseController]
})
export class BrowseModule {}
