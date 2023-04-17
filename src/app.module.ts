import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { ConfigModule, ConfigService } from '@nestjs/config';
import SPClientConfig from '../config/spotify-client';
import RedisClientConfig from '../config/redis-client';
import { ApiModule } from './api/api.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { SearchModule } from './search/search.module';
import { BrowseModule } from './browse/browse.module';
import { MarketsModule } from './markets/markets.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [SPClientConfig, RedisClientConfig],
      isGlobal: true,
      cache: true 
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<{ 
          redis_client: { 
            ttl: number, 
            url: string, 
            host: string, 
            pwd: string, 
            port: number 
          } 
        }, 
          true>
        ) => ({
          store: redisStore,
          ttl: configService.get('redis_client.ttl', {infer: true}),
          host: configService.get('redis_client.host', {infer: true}),
          password: configService.get('redis_client.pwd', {infer: true}),
          port: configService.get('redis_client.port', {infer: true})
        }),  
      inject: [ConfigService],
    }),
    AuthModule,
    ApiModule,
    TracksModule, 
    AlbumsModule, 
    ArtistsModule,
    SearchModule, 
    BrowseModule, 
    MarketsModule, 
  ]
})
export class AppModule {}
