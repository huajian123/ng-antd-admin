import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';

@Module({
  controllers: [DepartmentController],
})
export class DepartmentModule {}
