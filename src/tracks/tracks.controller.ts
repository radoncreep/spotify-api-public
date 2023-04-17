import { Controller, Get, HttpCode, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TracksService } from './tracks.service';


@Controller('tracks')
export class TracksController {
    private client_id: string;

    constructor(
        private tracksService: TracksService, 
        private configService: ConfigService<{ spotify_client: { id: string, secret: string} }, true>
    ) {
        // this.client_id = this.configService.get<string>('CLIENT_ID') as string; GET ENV VALUE
        this.client_id = this.configService.get<string>('spotify_client.id', { infer: true }); // GET CONFIG VALUE
    }

    @Get()
    @HttpCode(200)
    async getTrack(@Query('id') id: string ): Promise<Record<string, any>> {
        // error handling here, since its the controller's jon to handle request and response
        // services propose a singular functionality
        try {
            return await this.tracksService.getOne(id);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.SERVICE_UNAVAILABLE,
                error: error.message
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    @Get('/many') 
    async getTracks(@Query('ids') ids: string[]): Promise<any> {
        try {
            return await this.tracksService.getMany(ids);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.SERVICE_UNAVAILABLE,
                error: error.message
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }        
    }

    @Get('/feature') 
    async getOneFeature(@Query('id') id: string): Promise<any> {
        try {
            return await this.tracksService.getFeature(id);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.SERVICE_UNAVAILABLE,
                error: error.message
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    @Get('/features') 
    async getManyFeature(@Query('ids') ids: string[]): Promise<any> {
        try {
            return await this.tracksService.getFeatures(ids);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.SERVICE_UNAVAILABLE,
                error: error.message
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    @Get('/analysis') 
    async getOneAnalysis(@Query('id') id: string): Promise<any> {
        try {
            return await this.tracksService.getAnalysis(id);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.SERVICE_UNAVAILABLE,
                error: error.message
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
}
