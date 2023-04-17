import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios/dist';
import axios, { Axios, AxiosError, AxiosRequestConfig } from 'axios';

import { AuthService } from 'src/auth/auth.service';
import { ApiService } from './api.service';


@Module({
  imports: [HttpModule],
  providers: [ApiService],
  exports: [HttpModule, ApiService]
})

export class ApiModule implements OnModuleInit {

  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService
  ) {
    
  }

  public onModuleInit() {
    const instance = this.httpService.axiosRef;
    
    instance.defaults.headers['retry'] = 0;
    instance.defaults.headers['retryDelay'] = 1000;
    instance.defaults.headers['retryCount'] = 0;

  
    instance.interceptors.request.use(async (config: AxiosRequestConfig<any>) => {
      let headers = {
        'Authorization': 'Bearer ' + await this.authService.getAccesToken(),
        'Content-Type': 'application/json'
      }

      config.headers = {...config.headers, ...headers};
      
      return config;
    })

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        // console.log({error})

        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status !== 401) {
            console.log("error here", error.response.data.error)
            throw error
          }
        }
        const config = error.config!;

        // console.log({ config })

        config.headers['retryCount'] = config.headers['retryCount'] || 0;

        const requestRetries: number = +config.headers['retry'];
        let retryCounter: number = +config.headers['retryCount'];
        
        if (config.headers['retryCount']  >= requestRetries) {
          throw new Error(error.message);
        }

        retryCounter += 1;
        config.headers['retryCount'] += retryCounter;

        const requestRetryDelay = +config.headers['retryDelay'];
        let backOff = new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, requestRetryDelay || 1)
        })

        return backOff.then(async() => {
          if (error.response.status === 401) {
            const accessToken = await this.authService.getAccesToken();

            instance.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
          }
          return instance(config);
        })
          
      }
    )
  }
}
