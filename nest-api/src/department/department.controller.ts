import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('department')
export class DepartmentController {
  @Post('/list')
  departmentList() {
    return {
      code: 0,
      msg: 'SUCCESS',
      data: {
        total: 7,
        list: [
          {
            id: 15,
            departmentName: '开发部门',
            fatherId: 0,
            createTime: 1631522590000,
            updateTime: 1652253868000,
            state: true,
            orderNum: 1,
          },
          {
            id: 17,
            departmentName: '开发一部',
            fatherId: 15,
            createTime: 1631522599000,
            updateTime: 1652083726000,
            state: true,
            orderNum: 1,
          },
          {
            id: 30,
            departmentName: '测试部门',
            fatherId: 17,
            createTime: 1652239571000,
            updateTime: 1652239571000,
            state: true,
            orderNum: 1,
          },
          {
            id: 31,
            departmentName: '客服部门子部门',
            fatherId: 16,
            createTime: 1652434455000,
            updateTime: 1652434455000,
            state: true,
            orderNum: 1,
          },
          {
            id: 16,
            departmentName: '客服部门',
            fatherId: 0,
            createTime: 1631522595000,
            updateTime: 1652251080000,
            state: true,
            orderNum: 2,
          },
          {
            id: 29,
            departmentName: '开发二部',
            fatherId: 15,
            createTime: 1652083892000,
            updateTime: 1652247677000,
            state: true,
            orderNum: 3,
          },
          {
            id: 32,
            departmentName: '独立部门',
            fatherId: 0,
            createTime: 1652434464000,
            updateTime: 1652434464000,
            state: true,
            orderNum: 3,
          },
        ],
        pageNum: 0,
        pageSize: 0,
        size: 7,
        startRow: 1,
        endRow: 7,
        pages: 0,
        prePage: 0,
        nextPage: 0,
        isFirstPage: false,
        isLastPage: true,
        hasPreviousPage: false,
        hasNextPage: false,
        navigatePages: 8,
        navigatepageNums: [],
        navigateFirstPage: 0,
        navigateLastPage: 0,
      },
    };
  }

  @Get('/*')
  getDepartmentDetail() {
    return {
      code: 0,
      msg: 'SUCCESS',
      data: {
        id: 15,
        departmentName: '开发部门',
        fatherId: 0,
        createTime: 1631522590000,
        updateTime: 1652253868000,
        state: true,
        orderNum: 1,
      },
    };
  }

  @Put()
  updateDepartment() {
    return { code: 0, msg: 'SUCCESS', data: null };
  }

  @Post()
  addDepartment() {
    return { code: 0, msg: 'SUCCESS', data: null };
  }

  @Post('/del')
  delDepartment() {
    return { code: 0, msg: 'SUCCESS', data: null };
  }
}
