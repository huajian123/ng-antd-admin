import { Module } from '@nestjs/common';
import { DrizzleAsyncProvider, drizzleProvider } from './drizzle.provider';

@Module({
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule {}
