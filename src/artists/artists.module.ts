import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ApiModule } from 'src/api/api.module';


@Module({
  imports: [ApiModule],
  providers: [ArtistsService],
  controllers: [ArtistsController]
})
export class ArtistsModule {}
