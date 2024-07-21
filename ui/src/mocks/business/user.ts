import { http, HttpResponse } from 'msw';

const userList = http.post('/site/api/user/list/', () => {
  return HttpResponse.json({
    code: 0,
    msg: 'SUCCESS',
    data: {
      total: 12,
      list: [
        {
          id: 24,
          userName: 'admin10',
          available: true,
          roleName: ['超级管理员', '开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434433000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        },
        {
          id: 23,
          userName: 'admin9',
          available: true,
          roleName: ['超级管理员', '开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434420000,
          telephone: '02884449802',
          departmentId: 15,
          departmentName: '开发部门'
        },
        {
          id: 22,
          userName: 'admin8',
          available: true,
          roleName: ['超级管理员'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434407000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        },
        {
          id: 21,
          userName: 'admin7',
          available: true,
          roleName: ['超级管理员', '开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434396000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        },
        {
          id: 20,
          userName: 'admin6',
          available: true,
          roleName: ['超级管理员'],
          sex: 1,
          mobile: 13131313131,
          email: '287643967@qq.com',
          lastLoginTime: null,
          createTime: 1652434385000,
          telephone: '02884449802',
          departmentId: 15,
          departmentName: '开发部门'
        },
        {
          id: 19,
          userName: 'admin5',
          available: true,
          roleName: ['超级管理员', '开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434373000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        },
        {
          id: 18,
          userName: 'admin4',
          available: true,
          roleName: ['超级管理员'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434312000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        },
        {
          id: 17,
          userName: 'admin3',
          available: true,
          roleName: ['超级管理员'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434255000,
          telephone: '02884449802',
          departmentId: 30,
          departmentName: '测试部门'
        },
        {
          id: 16,
          userName: 'admin2',
          available: true,
          roleName: ['超级管理员', '开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434234000,
          telephone: '02884449802',
          departmentId: 15,
          departmentName: '开发部门'
        },
        {
          id: 15,
          userName: 'admin1',
          available: true,
          roleName: ['开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434222000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        }
      ],
      pageNum: 1,
      pageSize: 10,
      size: 10,
      startRow: 1,
      endRow: 10,
      pages: 2,
      prePage: 0,
      nextPage: 2,
      isFirstPage: true,
      isLastPage: false,
      hasPreviousPage: false,
      hasNextPage: true,
      navigatePages: 8,
      navigatepageNums: [1, 2],
      navigateFirstPage: 1,
      navigateLastPage: 2
    }
  });
});

// 删除用户，入参示例为，删除id为3的角色
// {
//   ids:[3]
// }
const delUser = http.post('/site/api/user/del/', () => {
  return HttpResponse.json({
    code: 0,
    msg: 'SUCCESS',
    data: {
      total: 12,
      list: [
        {
          id: 24,
          userName: 'admin10',
          available: true,
          roleName: ['超级管理员', '开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434433000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        },
        {
          id: 23,
          userName: 'admin9',
          available: true,
          roleName: ['超级管理员', '开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434420000,
          telephone: '02884449802',
          departmentId: 15,
          departmentName: '开发部门'
        },
        {
          id: 22,
          userName: 'admin8',
          available: true,
          roleName: ['超级管理员'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434407000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        },
        {
          id: 21,
          userName: 'admin7',
          available: true,
          roleName: ['超级管理员', '开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434396000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        },
        {
          id: 20,
          userName: 'admin6',
          available: true,
          roleName: ['超级管理员'],
          sex: 1,
          mobile: 13131313131,
          email: '287643967@qq.com',
          lastLoginTime: null,
          createTime: 1652434385000,
          telephone: '02884449802',
          departmentId: 15,
          departmentName: '开发部门'
        },
        {
          id: 19,
          userName: 'admin5',
          available: true,
          roleName: ['超级管理员', '开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434373000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        },
        {
          id: 18,
          userName: 'admin4',
          available: true,
          roleName: ['超级管理员'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434312000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        },
        {
          id: 17,
          userName: 'admin3',
          available: true,
          roleName: ['超级管理员'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434255000,
          telephone: '02884449802',
          departmentId: 30,
          departmentName: '测试部门'
        },
        {
          id: 16,
          userName: 'admin2',
          available: true,
          roleName: ['超级管理员', '开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434234000,
          telephone: '02884449802',
          departmentId: 15,
          departmentName: '开发部门'
        },
        {
          id: 15,
          userName: 'admin1',
          available: true,
          roleName: ['开发工程师'],
          sex: 1,
          mobile: 13131313131,
          email: '345@adf.v',
          lastLoginTime: null,
          createTime: 1652434222000,
          telephone: '02884449802',
          departmentId: 17,
          departmentName: '开发一部'
        }
      ],
      pageNum: 1,
      pageSize: 10,
      size: 10,
      startRow: 1,
      endRow: 10,
      pages: 2,
      prePage: 0,
      nextPage: 2,
      isFirstPage: true,
      isLastPage: false,
      hasPreviousPage: false,
      hasNextPage: true,
      navigatePages: 8,
      navigatepageNums: [1, 2],
      navigateFirstPage: 1,
      navigateLastPage: 2
    }
  });
});

// id为24的角色信息
const user24Info = http.get('/site/api/user/*', () => {
  return HttpResponse.json({
    code: 0,
    msg: 'SUCCESS',
    data: {
      id: 24,
      userName: 'admin10',
      available: true,
      roleName: null,
      sex: 1,
      mobile: 13131313131,
      email: '345@adf.v',
      telephone: '02884449802',
      roleId: [1, 2],
      departmentName: '开发一部',
      departmentId: 17
    }
  });
});

const updateUserInfo = http.put('/site/api/user/', () => {
  return HttpResponse.json({
    code: 0,
    msg: 'SUCCESS',
    data: null
  });
});

const updateUserPassword = http.put('/site/api/user/psd', () => {
  return HttpResponse.json({
    code: 0,
    msg: 'SUCCESS',
    data: null
  });
});

export const user = [userList, delUser, user24Info, updateUserInfo, updateUserPassword];
