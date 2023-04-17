import { Module } from '@nestjs/common';
import { ApiModule } from 'src/api/api.module';
import { SearchController } from './search.controller';

@Module({
    imports: [ApiModule],
    controllers: [SearchController]
})
export class SearchModule {}
