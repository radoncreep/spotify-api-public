import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { ApiModule } from 'src/api/api.module';

@Module({
  controllers: [AlbumsController],
  imports: [ApiModule]
})
export class AlbumsModule {}
