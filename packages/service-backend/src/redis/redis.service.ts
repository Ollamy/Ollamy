import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from 'setup';

@Injectable()
export class RedisCacheService {
  private readonly redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient({
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    });

    this.redisClient.connect();
    this.redisClient.auth({ username: 'default', password: REDIS_PASSWORD });
  }

  async set(key: string, value: string) {
    await this.redisClient.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    const value = await this.redisClient.get(key);

    return value;
  }

  async del(key: string) {
    const num = await this.redisClient.del(key);

    return num;
  }
}
