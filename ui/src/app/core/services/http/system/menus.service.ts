import { HttpResourceRef } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { Menu, PageInfo, SearchCommonVO } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export interface MenuListObj {
  menuName: string;
  code: string;
  alIcon: string;
  icon: string;
  orderNum: number;
  menuType: 'C' | 'F'; // c:菜单，f按钮
  path: string;
  visible: 0 | 1;
  status: boolean;
  newLinkFlag: 0 | 1;
}

@Service()
export class MenusService {
  http = inject(BaseHttpService);

  getMenuListResource(param: () => SearchCommonVO<NzSafeAny>): HttpResourceRef<PageInfo<Menu>> {
    return this.http.postResource<PageInfo<Menu>>('/menu/list', param);
  }

  public getMenuDetail(id: number): Observable<MenuListObj> {
    return this.http.get(`/menu/${id}`);
  }

  public addMenus(param: MenuListObj): Observable<void> {
    return this.http.post('/menu/create', param, { needSuccessInfo: true });
  }

  public editMenus(param: MenuListObj): Observable<void> {
    return this.http.put('/menu/update', param, { needSuccessInfo: true });
  }

  public delMenus(id: number): Observable<void> {
    return this.http.post('/menu/del', { ids: [id] }, { needSuccessInfo: true });
  }
}
