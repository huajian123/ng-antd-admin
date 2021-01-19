import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {PageInfo, Role, SearchCommonVO} from '../../types';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  mockRole: PageInfo<Role> = {
    pageNum: 2,
    pageSize: 3,
    total: 12,
    list: [{roleName: '超级管理员', roleDesc: '拥有所有权限'}]
  };

  constructor(public http: BaseHttpService) {
  }

  public getRoles(param: SearchCommonVO<any>): Observable<PageInfo<Role>> {
    // return of(this.mockRole);
    return this.http.get('/role', param);
  }

  public addRoles(param: Role): Observable<void> {
    // return of(this.mockRole);
    return this.http.post('/role', param);
  }

  public delRoles(id: number): Observable<void> {
    return this.http.delete('/role/' + id);
  }
}
