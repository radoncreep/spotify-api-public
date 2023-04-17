import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { ApiService } from 'src/api/api.service';
import { AxiosResponse } from 'axios';


@Injectable()
export class ArtistsService {
    private readonly baseUrl = "https://api.spotify.com/v1/";

    constructor(
        private readonly httpService: HttpService,
        private readonly apiService: ApiService
    ) { }

    async getOne(id: string): Promise<AxiosResponse<any>> {
        return this.apiService.getById('artists', id);
    }

    async getMany(ids: string[]): Promise<Record<string, any>> {
        const response = await 
            this.httpService.axiosRef.get(`${this.baseUrl}artists`, {
                params: {ids}
            });

        return response.data;
    }

    async getFeature(id: string): Promise<Record<string, any>> {
        const response = await 
            this.httpService.axiosRef.get(`${this.baseUrl}audio-features/${id}`);

        return response.data;
    }

    async getFeatures(ids: string[]): Promise<Record<string, any>> {
        const response = await 
            this.httpService.axiosRef.get(`${this.baseUrl}audio-features`, {
                params: {ids}
            });

        return response.data;
    }

    async getAnalysis(id: string): Promise<Record<string, any>> {
        const response = await 
            this.httpService.axiosRef.get(`${this.baseUrl}artists/${id}`);

        return response.data;
    }
}
