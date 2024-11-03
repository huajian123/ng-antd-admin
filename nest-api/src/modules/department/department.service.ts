import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentService {
  constructor() {}
  //
  // async create(data: CreateDepartmentDto) {
  //   await this.prisma.department.create({ data });
  //   return null;
  // }
  //
  // async findAll(
  //   searchParam: FilterParam<Partial<CreateDepartmentDto>>,
  //   order: 'asc' | 'desc' = 'asc',
  // ) {
  //   const list = await this.prisma.department.findMany({
  //     where: searchParam.filters,
  //     orderBy: {
  //       orderNum: order,
  //     },
  //   });
  //   return TableDataInfo.result(list);
  // }
  //
  // findOne(id: number) {
  //   return this.prisma.department.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  // }
  //
  // async update(data: UpdateDepartmentDto) {
  //   await this.prisma.department.update({
  //     where: {
  //       id: data.id,
  //     },
  //     data,
  //   });
  //   return null;
  // }
  //
  // async remove(ids: number[]) {
  //   await this.prisma.department.deleteMany({
  //     where: {
  //       id: { in: ids },
  //     },
  //   });
  //   return null;
  // }
}
