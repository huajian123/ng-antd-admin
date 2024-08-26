import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('role')
export class RoleController {
  @Post('list')
  getRoleList() {
    return {
      code: 0,
      msg: 'SUCCESS',
      data: {
        total: 2,
        list: [
          {
            id: 1,
            roleName: '超级管理员',
            roleDesc: '超级管理员',
          },
          {
            id: 2,
            roleName: '开发工程师',
            roleDesc: '专注java开发三十年',
          },
        ],
        pageNum: 1,
        pageSize: 10,
        size: 2,
        startRow: 1,
        endRow: 2,
        pages: 1,
        prePage: 0,
        nextPage: 0,
        isFirstPage: true,
        isLastPage: true,
        hasPreviousPage: false,
        hasNextPage: false,
        navigatePages: 8,
        navigatepageNums: [1],
        navigateFirstPage: 1,
        navigateLastPage: 1,
      },
    };
  }

  @Get('/*')
  getRoleDetail() {
    return {
      code: 0,
      msg: 'SUCCESS',
      data: { id: 1, roleName: '超级管理员', roleDesc: '超级管理员' },
    };
  }

  @Post()
  addRole() {
    return { code: 0, msg: 'SUCCESS', data: null };
  }

  @Put()
  editRole() {
    return { code: 0, msg: 'SUCCESS', data: null };
  }

  @Post('/del')
  delRole() {
    return { code: 0, msg: 'SUCCESS', data: null };
  }
}
