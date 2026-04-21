import { http, HttpResponse } from 'msw';

interface User {
  id: number;
  email: string;
  userName: string;
  password: string;
  available: boolean;
  sex: number;
  mobile: string;
  telephone: string;
  departmentId: number;
  lastLoginTime: string;
  departmentName: string;
  roleId?: number[]; // 用户的角色ID数组
}

// 用户角色关联表 (from sys_user_role table)
const userRoles: Record<number, number[]> = {
  1: [1], // user id=1 has role id=1 (超级管理员)
  2: [2], // user id=2 has role id=2 (普通开发)
};

let users: User[] = [
  {
    id: 1,
    email: '287643967@qq.com',
    userName: 'admin',
    password: '$argon2id$v=19$m=65536,t=3,p=4$Luz1aQm4lsNaUL3G2EjIaw$8D/tDbkhT02WmB42CY/beFPDYot9TMppOvMKZ3LYo4I',
    available: true,
    sex: 1,
    mobile: '13131313131',
    telephone: '02884449802',
    departmentId: 4,
    lastLoginTime: '2024-11-23T09:52:45.101Z',
    departmentName: '研发部门'
  },
  {
    id: 2,
    email: '287643967@qq.com',
    userName: '普通用户',
    password: '$argon2id$v=19$m=65536,t=3,p=4$+7i55+ojvRh0ch48FHaknQ$7XQTQRICP4y+0xtkAJ/y9NSggiXt5ISkkxjznF2bNG4',
    available: true,
    sex: 1,
    mobile: '13131313131',
    telephone: '02884449802',
    departmentId: 5,
    lastLoginTime: '2024-11-23T09:53:08.019Z',
    departmentName: '测试部门'
  }
];

let nextId = 3;

// admin user's auth codes (all permissions for role id=1)
const adminAuthCodes = [
  'default:dashboard','default:dashboard:analysis','default:dashboard:monitor','default:dashboard:workbench',
  'default:page-demo','default:page-demo:form','default:page-demo:form:base-form','default:page-demo:form:step-form',
  'default:page-demo:form:advanced-form','default:page-demo:list','default:page-demo:list:search-list',
  'default:page-demo:list:search-list:article','default:page-demo:list:search-list:project',
  'default:page-demo:list:search-list:application','default:page-demo:list:search-table',
  'default:page-demo:list:tree-list','default:page-demo:list:standard-table','default:page-demo:list:card-table',
  'default:page-demo:detail','default:page-demo:detail:base-detail','default:page-demo:detail:adv-detail',
  'default:page-demo:result','default:page-demo:result:success','default:page-demo:result:fail',
  'default:page-demo:except','default:page-demo:except:except403','default:page-demo:except:except404',
  'default:page-demo:except:except500','default:page-demo:except:network-error','default:page-demo:except:no-data',
  'default:page-demo:personal','default:page-demo:personal:personal-center','default:page-demo:personal:personal-setting',
  'default:page-demo:flow','default:page-demo:flow:flow-chat','default:page-demo:task',
  'default:page-demo:page-demo1','default:page-demo:page-demo2','default:page-demo:page-demo3','default:page-demo:page-demo4',
  'default:feat','default:feat:msg','default:feat:icons','default:feat:context-menu','default:feat:img-preview',
  'default:feat:full-screen','default:feat:tabs','default:feat:ex-modal','default:feat:ex-drawer',
  'default:feat:rich-text','default:feat:click-out-side','default:feat:frame','default:feat:frame:zorro-doc',
  'https://github.com/huajian123/ng-antd-admin',
  'default:feat:scroll','default:feat:scroll:keep-scroll-page','default:feat:scroll:play-scroll',
  'default:feat:charts','default:feat:charts:gaode-map','default:feat:charts:baidu-map','default:feat:charts:echarts',
  'blank:other-login','blank:other-login:login1',
  'default:feat:color-sel','default:feat:ripple','default:feat:copy','blank:empty-page',
  'default:feat:setup','default:feat:session-timeout','default:feat:websocket','default:feat:upload',
  'default:feat:download','default:feat:qrcode','default:feat:water-mark','default:feat:keep-alive',
  'default:feat:transitions',
  'default:comp','default:comp:basic','default:comp:transition','default:comp:luckysheet',
  'default:comp:lazy','default:comp:lazy:lazy-basic','default:comp:lazy:lazy-scroll',
  'default:comp:lazy:lazy-defer','default:comp:lazy:lazy-loadscript','default:comp:lazy:dynamic-comp',
  'default:comp:desc','default:comp:strength-meter','default:comp:form','default:comp:form:shrink-form',
  'default:comp:form:append-form','default:comp:blingbling',
  'default:level','default:level:menu1','default:level:menu1:menu1-1',
  'default:level:menu1:menu1-1:menu1-1-1','default:level:menu1:menu1-1:menu1-1-2',
  'default:level:menu1:menu1-2','default:level:menu2',
  'default:system','default:system:account','default:system:account:add','default:system:account:edit','default:system:account:del',
  'default:system:role-manager','default:system:role-manager:add','default:system:role-manager:edit',
  'default:system:role-manager:del','default:system:role-manager:set-role',
  'default:system:menu','default:system:menu:add','default:system:menu:edit','default:system:menu:del','default:system:menu:addlowlevel',
  'default:system:dept','default:system:dept:add','default:system:dept:edit','default:system:dept:del','default:system:dept:addlowlevel',
  'default:about'
];

export const user = [
  http.post('/site/api/user/list', async ({ request }) => {
    const body = await request.json() as { pageIndex: number; pageSize: number; filters?: Partial<User> };
    const { pageIndex, pageSize, filters } = body;
    let list = [...users];
    if (filters?.userName) {
      list = list.filter(u => u.userName.includes(filters.userName!));
    }
    const total = list.length;
    const start = (pageIndex - 1) * pageSize;
    return HttpResponse.json({
      code: 200, msg: 'SUCCESS',
      data: { total, pageSize, pageIndex, list: list.slice(start, start + pageSize) }
    });
  }),

  http.get('/site/api/user/:id', ({ params }) => {
    const userId = Number(params['id']);
    const item = users.find(u => u.id === userId);
    if (!item) {
      return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
    }
    // Add roleId array to user detail
    const userWithRole = { ...item, roleId: userRoles[userId] || [] };
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: userWithRole });
  }),

  http.get('/site/api/user/auth-code/:id', ({ params }) => {
    // user id=1 is admin with all permissions
    const codes = Number(params['id']) === 1 ? adminAuthCodes : ['default:dashboard', 'default:dashboard:analysis'];
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: codes });
  }),

  http.post('/site/api/user/create', async ({ request }) => {
    const body = await request.json() as Omit<User, 'id' | 'lastLoginTime'>;
    const newItem: User = { ...body, id: nextId++, lastLoginTime: new Date().toISOString() };
    users.push(newItem);
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
  }),

  http.put('/site/api/user/update', async ({ request }) => {
    const body = await request.json() as User;
    const idx = users.findIndex(u => u.id === body.id);
    if (idx !== -1) users[idx] = { ...users[idx], ...body };
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
  }),

  http.post('/site/api/user/del', async ({ request }) => {
    const { ids } = await request.json() as { ids: number[] };
    users = users.filter(u => !ids.includes(u.id));
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
  }),

  http.put('/site/api/user/psd', async () => {
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
  }),
];
