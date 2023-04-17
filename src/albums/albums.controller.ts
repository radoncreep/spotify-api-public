import { Controller, Get, HttpCode, Query } from '@nestjs/common';

import { ApiService } from 'src/api/api.service';

@Controller('albums')
export class AlbumsController {
    constructor(private apiService: ApiService) {}

    @Get()
    @HttpCode(200)
    async getArtist(@Query('id') id: string ): Promise<any> {
        return await this.apiService.getById('albums', id);
    }

    @Get('/many') 
    async getArtists(@Query('ids') ids: string[]): Promise<any> {
        return await this.apiService.getByIds('albums', ids);        
    }

    @Get('/top-tracks') 
    async getTopTracks(@Query() query: Record<'id' | 'market', string>): Promise<any> {
        const { id, market } = query;

        return await this
            .apiService
            .getByPath(`artists/${id}/top-tracks?market=${market}`
        );
    }

    @Get('/related') 
    async getRelatedArtists(@Query('id') id: string): Promise<any> {
        return await this.apiService.getByPath(`artists/${id}/related-artists`);
    }

    @Get('/albums') 
    async getOneAnalysis(@Query() query: Record<'id' | 'groups' | 'limit', string>): Promise<any> {
        const { id, groups, limit } = query;

        return await this
            .apiService
            .getByPath(`artists/${id}/albums?include_groups=${groups}&limit=${limit}`
        );
    }
}
