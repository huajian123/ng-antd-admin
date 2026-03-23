import { http, HttpResponse } from 'msw';

interface Role {
  id: number;
  roleName: string;
  roleDesc: string | null;
  createdAt: string;
  updatedAt: string | null;
}

let roles: Role[] = [
  { id: 1, roleName: '超级管理员', roleDesc: '拥有所有权限', createdAt: '2024-11-19T13:26:21.226Z', updatedAt: null },
  { id: 2, roleName: '普通开发', roleDesc: '权限有限', createdAt: '2024-11-19T13:26:33.038Z', updatedAt: null },
];

let nextId = 3;

export const role = [
  http.post('/site/api/role/list', async ({ request }) => {
    const body = await request.json() as { pageIndex: number; pageSize: number; filters?: Partial<Role> };
    const { pageIndex, pageSize, filters } = body;
    let list = [...roles];
    if (filters?.roleName) {
      list = list.filter(r => r.roleName.includes(filters.roleName!));
    }
    const total = list.length;
    // pageSize=0 means return all data
    if (pageSize === 0) {
      return HttpResponse.json({
        code: 200, msg: 'SUCCESS',
        data: { total, pageSize, pageIndex, list }
      });
    }
    const start = (pageIndex - 1) * pageSize;
    return HttpResponse.json({
      code: 200, msg: 'SUCCESS',
      data: { total, pageSize, pageIndex, list: list.slice(start, start + pageSize) }
    });
  }),

  http.get('/site/api/role/:id', ({ params }) => {
    const item = roles.find(r => r.id === Number(params['id']));
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: item ?? null });
  }),

  http.post('/site/api/role/create', async ({ request }) => {
    const body = await request.json() as Omit<Role, 'id' | 'createdAt' | 'updatedAt'>;
    const newItem: Role = { ...body, id: nextId++, createdAt: new Date().toISOString(), updatedAt: null };
    roles.push(newItem);
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: newItem });
  }),

  http.put('/site/api/role/update', async ({ request }) => {
    const body = await request.json() as Role;
    const idx = roles.findIndex(r => r.id === body.id);
    if (idx !== -1) roles[idx] = { ...roles[idx], ...body, updatedAt: new Date().toISOString() };
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
  }),

  http.post('/site/api/role/del', async ({ request }) => {
    const { ids } = await request.json() as { ids: number[] };
    roles = roles.filter(r => !ids.includes(r.id));
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
  }),
];
