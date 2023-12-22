import { http, HttpResponse } from 'msw';

// 角色列表
const roleList = http.post('/site/api/role/list/', () => {
  return HttpResponse.json({
    code: 0,
    msg: 'SUCCESS',
    data: {
      total: 2,
      list: [
        {
          id: 1,
          roleName: '超级管理员',
          roleDesc: '超级管理员'
        },
        {
          id: 2,
          roleName: '开发工程师',
          roleDesc: '专注java开发三十年'
        }
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
      navigateLastPage: 1
    }
  });
});

const roleId1Info = http.get('/site/api/role/1/', () => {
  return HttpResponse.json({ code: 0, msg: 'SUCCESS', data: { id: 1, roleName: '超级管理员', roleDesc: '超级管理员' } });
});

const roleId2Info = http.get('/site/api/role/2/', () => {
  return HttpResponse.json({
    code: 0,
    msg: 'SUCCESS',
    data: {
      id: 2,
      roleName: '开发工程师',
      roleDesc: '专注java开发三十年'
    }
  });
});

export const role = [roleList, roleId1Info, roleId2Info];
