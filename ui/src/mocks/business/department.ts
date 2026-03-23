import { http, HttpResponse } from 'msw';

interface Department {
  id: number;
  fatherId: number;
  departmentName: string;
  orderNum: number;
  state: boolean;
  createdAt: string;
  updatedAt: string | null;
}

let departments: Department[] = [
  { id: 1, fatherId: 0, departmentName: 'Ant科技', orderNum: 0, state: true, createdAt: '2024-11-19T13:28:41.890Z', updatedAt: null },
  { id: 2, fatherId: 1, departmentName: '南京总公司', orderNum: 0, state: true, createdAt: '2024-11-19T13:28:50.898Z', updatedAt: null },
  { id: 3, fatherId: 1, departmentName: '上海分公司', orderNum: 0, state: true, createdAt: '2024-11-19T13:29:01.310Z', updatedAt: null },
  { id: 4, fatherId: 2, departmentName: '研发部门', orderNum: 0, state: true, createdAt: '2024-11-19T13:29:09.132Z', updatedAt: null },
  { id: 5, fatherId: 2, departmentName: '测试部门', orderNum: 1, state: true, createdAt: '2024-11-19T13:29:15.138Z', updatedAt: null },
  { id: 6, fatherId: 3, departmentName: '市场部门', orderNum: 0, state: true, createdAt: '2024-11-19T13:29:21.009Z', updatedAt: null },
  { id: 7, fatherId: 3, departmentName: '营销部门', orderNum: 1, state: true, createdAt: '2024-11-19T13:29:27.913Z', updatedAt: null },
];

let nextId = 8;

export const department = [
  http.post('/site/api/department/list', async ({ request }) => {
    const body = await request.json() as { pageIndex: number; pageSize: number; filters?: Partial<Department> };
    const { pageIndex, pageSize, filters } = body;
    let list = [...departments];
    if (filters?.departmentName) {
      list = list.filter(d => d.departmentName.includes(filters.departmentName!));
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

  http.get('/site/api/department/:id', ({ params }) => {
    const item = departments.find(d => d.id === Number(params['id']));
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: item ?? null });
  }),

  http.post('/site/api/department/create', async ({ request }) => {
    const body = await request.json() as Omit<Department, 'id' | 'createdAt' | 'updatedAt'>;
    const newItem: Department = { ...body, id: nextId++, createdAt: new Date().toISOString(), updatedAt: null };
    departments.push(newItem);
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: newItem });
  }),

  http.put('/site/api/department/update', async ({ request }) => {
    const body = await request.json() as Department;
    const idx = departments.findIndex(d => d.id === body.id);
    if (idx !== -1) departments[idx] = { ...departments[idx], ...body, updatedAt: new Date().toISOString() };
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
  }),

  http.post('/site/api/department/del', async ({ request }) => {
    const { ids } = await request.json() as { ids: number[] };
    departments = departments.filter(d => !ids.includes(d.id));
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
  }),
];
