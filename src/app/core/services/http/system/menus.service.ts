import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Menu, PageInfo, SearchCommonVO } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';

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

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  http = inject(BaseHttpService);

  public getMenuList(param: SearchCommonVO<any>): Observable<PageInfo<Menu>> {
    return this.http.post('/sysPermission/list', param);
  }

  public addMenus(param: MenuListObj): Observable<void> {
    return this.http.post('/sysPermission', param, { needSuccessInfo: true });
  }

  public editMenus(param: MenuListObj): Observable<void> {
    return this.http.put('/sysPermission', param, { needSuccessInfo: true });
  }

  public delMenus(id: number): Observable<void> {
    return this.http.post('/sysPermission/del', { ids: [id] }, { needSuccessInfo: true });
  }

  public getMenuDetail(id: number): Observable<MenuListObj> {
    return this.http.get(`/sysPermission/${id}`);
  }
}
