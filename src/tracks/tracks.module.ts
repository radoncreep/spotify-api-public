import { Module } from '@nestjs/common';

import { ApiModule } from 'src/api/api.module';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
    imports: [ApiModule],
    controllers: [TracksController],
    providers: [TracksService],
    exports: [TracksService]
})
export class TracksModule {}
