import { registerAs } from '@nestjs/config';


export default registerAs('spotify_client', () => ({
    id: process.env.CLIENT_ID as string,
    secret: process.env.CLIENT_SECRET as string,
    redis_c_pwd: process.env.REDIS_CLOUD_PASSWORD,
    redis_c_host: process.env.REDIS_CLOUD_HOST,
    redis_c_port: process.env.REDIS_CLOUD_PORT,
    redis_url: `default:${process.env.REDIS_CLOUD_PASSWORD}@redis-11115.c300.eu-central-1-1.ec2.cloud.redislabs.com:11115`,
    redis_ttl: 3600
}))
