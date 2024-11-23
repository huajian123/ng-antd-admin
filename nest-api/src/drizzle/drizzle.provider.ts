import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const connectionString = configService.get<string>('DATABASE_URL');
      // 创建一个node-postgres驱动程序实例，可以使用db.$client访问 pool
      const pool = new Pool({
        connectionString,
      });

      // 所有驼峰都改为下划线别名
      return drizzle({
        client: pool,
        logger: true,
        schema,
        casing: 'snake_case',
      }) as NodePgDatabase<typeof schema>;
    },
  },
];
