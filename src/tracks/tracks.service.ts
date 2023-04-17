import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { ITrack } from './tracks.interface';


@Injectable()
export class TracksService {
    private readonly baseUrl = "https://api.spotify.com/v1/";

    constructor(
        private readonly httpService: HttpService,
    ) {}

    async getOne(id: string): Promise<ITrack> {

        const response: AxiosResponse<ITrack> = await 
            this.httpService.axiosRef.get(`${this.baseUrl}tracks/${id}`, {
            });

        return response.data;
    }

    async getMany(ids: string[]) {
        const response: AxiosResponse<ITrack[]> = await 
            this.httpService.axiosRef.get(`${this.baseUrl}tracks`, {
                params: {ids}
            });

        return response.data;
    }

    async getFeature(id: string) {

        const response: AxiosResponse = await 
            this.httpService.axiosRef.get(`${this.baseUrl}audio-features/${id}`);

        return response.data;
    }

    async getFeatures(ids: string[]) {

        const response: AxiosResponse = await 
            this.httpService.axiosRef.get(`${this.baseUrl}audio-features`, {
                params: {ids}
            });

        return response.data;
    }

    async getAnalysis(id: string) {
        const response: AxiosResponse<ITrack> = await 
            this.httpService.axiosRef.get(`${this.baseUrl}audio-analysis/${id}`, {
            });

        return response.data;
    }
}
