import { Controller, Get, HttpCode, Query } from '@nestjs/common';

import { ApiService } from 'src/api/api.service';


@Controller('browse')
export class BrowseController {

    private readonly basePath = 'browse'

    constructor(private apiService: ApiService) {}

    @Get('recommendations')
    @HttpCode(200)
    async getRecommendations(@Query() query: Record<string, string>): Promise<any> {
        const { limit, market, seed_artists, genre_id, seed_genres, seed_tracks } = query;

        return await this.apiService.getByPath(
            `recommendations?limit=${limit}&market=${market}&seed_artists=${seed_artists}&seed_genres=${seed_genres}&seed_tracks=${seed_tracks}`
        );
    }

    @Get('new-releases')
    @HttpCode(200)
    async getNewReleases(@Query() query: Record<string, string>): Promise<any> {
        const { limit, country } = query;
        
        return await this
            .apiService
            
            .getByPath(`${this.basePath}/new-releases?country=${country}&limit=${limit}`
        );
    }

    @Get('categories')
    @HttpCode(200)
    async getCategories(@Query() query: Record<string, string>): Promise<any> {
        const { limit, country, locale } = query;
        return await this.apiService.getByPath(
            `${this.basePath}/categories?country=${country}&locale=${locale}&limit=${limit}`);
    }

    @Get('category')
    @HttpCode(200)
    async getCateogories(@Query('id') id: string ): Promise<any> {
        return await this.apiService.getById('artists', id);
    }

    @Get('category')
    @HttpCode(200)
    async getCategory(@Query('id') id: string ): Promise<any> {
        return await this.apiService.getById('artists', id);
    }

    @Get('category-playlists')
    @HttpCode(200)
    async getCateogoryPlaylists(@Query('id') id: string ): Promise<any> {
        return await this.apiService.getById('artists', id);
    }

    @Get('genre-seeds')
    @HttpCode(200)
    async getAvailableGenreSeeds(@Query('id') id: string ): Promise<any> {
        return await this.apiService.getById('artists', id);
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
