import { registerAs } from '@nestjs/config';


export default registerAs('redis_client', () => ({
    pwd: process.env.REDIS_CLOUD_PASSWORD,
    host: process.env.REDIS_CLOUD_HOST,
    port: process.env.REDIS_CLOUD_PORT,
    url: `${process.env.REDIS_CLOUD_USERNAME}:${process.env.REDIS_CLOUD_PASSWORD}@${process.env.REDIS_CLOUD_HOST}`,
    ttl: 3600
}))
