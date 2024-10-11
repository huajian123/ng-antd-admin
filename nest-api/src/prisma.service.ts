import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // The onModuleInit is optional — if you leave it out, Prisma will connect lazily on its first call to the database.
  async onModuleInit() {
    await this.$connect();
  }
}
