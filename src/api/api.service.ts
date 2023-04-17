import { HttpService } from '@nestjs/axios/dist';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';


@Injectable()
export class ApiService {
    private readonly baseURL = "https://api.spotify.com/v1";

    constructor(private readonly httpService: HttpService) {}

    async getById(path: string, id: string): Promise<any> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.baseURL}/${path}/${id}`)
            .pipe(catchError((error) => {
                const err = error as AxiosError;

                const status = err.response ? err.response['status'] : HttpStatus.SERVICE_UNAVAILABLE;
                const message = err.message;

                throw new HttpException({
                    status,
                    error: message
                }, status, {
                    cause: error.response.data.error!['message']
                });
            }))
        ) 

        return data;
    }

    async getByIds(path: string, ids: string[]): Promise<any> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.baseURL}/${path}`, {
                params: {ids}
            }).pipe(catchError((error) => {
                const err = error as AxiosError;

                const status = err.response ? err.response['status'] : HttpStatus.SERVICE_UNAVAILABLE;
                const message = err.message;

                throw new HttpException({
                    status,
                    error: message
                }, status, {
                    cause: error.response.data ? error.response.data.error!['message'] : 'server error'
                });
            }))
        ) 

        return data;
    }

    async getByPath(path: string): Promise<any> {
        const response = await firstValueFrom(
            this.httpService.get(`${this.baseURL}/${path}`)
            .pipe(catchError((error) => {
                console.log({URL: error.config.url})
                console.log({ data: error.config.data})
                const err = error as AxiosError;

                const status = err.response ? err.response['status'] : HttpStatus.SERVICE_UNAVAILABLE;
                const message = err.message;

                throw new HttpException({
                    status,
                    error: message
                }, status, {
                    cause: error.response.data ? error.response.data.error!['message'] : 'server error'
                });
            }))
        ) 
        
        // console.log({ response })
        return response.data;
    }
}
