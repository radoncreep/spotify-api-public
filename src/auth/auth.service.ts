import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { stringify } from 'querystring';

import { TokenResponse } from './auth.interface';


@Injectable()
export class AuthService {
    private readonly accessTokenUrl: string;
    private readonly clientId: string;
    private readonly clientSecret: string;

    constructor(
        private configService: ConfigService<{ spotify_client: { id: string, secret: string} }, true>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {
        this.accessTokenUrl = "https://accounts.spotify.com/api/token";
        this.clientId = this.configService.get<string>('spotify_client.id', { infer: true });
        this.clientSecret = this.configService.get<string>('spotify_client.secret', { infer: true });
    }


    public async getAccesToken() {
        try {
            const cachedToken = await this.cacheManager.get('sp_access_token');
      
            if (cachedToken) {
                return cachedToken;
            }
      
            const unInterceptedInstance = axios.create({
                headers: {
                    'Authorization': 'Basic ' + (Buffer.from(this.clientId + ':' + this.clientSecret, 'utf-8')).toString('base64'),
                }
            });
      
            let body = stringify({"grant_type": "client_credentials"});
            const response = await 
                unInterceptedInstance.post<TokenResponse>(this.accessTokenUrl, body);
      
            const { access_token, expires_in } = response.data;
            
            await this.cacheManager.set('sp_access_token', access_token, expires_in);
        
            return access_token;
          } catch (error) {
            throw new Error("Server error. Please try again later.");
          }
    }
}
