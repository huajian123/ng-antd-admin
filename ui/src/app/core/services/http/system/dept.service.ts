import { HttpResourceRef } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { PageInfo, SearchCommonVO } from '../../types';
import { BaseHttpService } from '../base-http.service';

/*
 *  部门列表
 * */
export interface Dept {
  id?: number;
  departmentName: string;
  fatherId: number;
  state: 1 | 0;
  orderNum: number;
}

@Service()
export class DeptService {
  http = inject(BaseHttpService);

  getDeptsResource(param: () => SearchCommonVO<Dept>): HttpResourceRef<PageInfo<Dept>> {
    return this.http.postResource<PageInfo<Dept>>('/department/list', param);
  }

  public getDeptsDetail(id: number): Observable<Dept> {
    return this.http.get(`/department/${id}`);
  }

  public addDepts(param: Dept): Observable<void> {
    return this.http.post('/department/create', param, { needSuccessInfo: true });
  }

  public delDepts(ids: number[]): Observable<void> {
    return this.http.post('/department/del', { ids }, { needSuccessInfo: true });
  }

  public editDepts(param: Dept): Observable<void> {
    return this.http.put('/department/update', param, { needSuccessInfo: true });
  }
}
