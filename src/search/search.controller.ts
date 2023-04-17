import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiService } from 'src/api/api.service';


@Controller('search')
export class SearchController {
    constructor(private apiService: ApiService) {}

    @Get()
    @HttpCode(200)
    async getSearch(@Query() query: Record<string, any> ): Promise<Record<string, any>> {
        const { searchQuery, type, market, limit } = query;

        return await this.apiService.getByPath(
            `search?q=${searchQuery}&type=${type}&market=${market}&limit=${limit}`
        );
    }
}
