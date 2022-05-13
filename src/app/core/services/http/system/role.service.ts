import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {PageInfo, Permission, PutPermissionParam, Role, SearchCommonVO} from '../../types';
import {Observable} from 'rxjs';
import {NzSafeAny} from "ng-zorro-antd/core/types";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(public http: BaseHttpService) {
  }

  public getRoles(param: SearchCommonVO<Role>): Observable<PageInfo<Role>> {
    return this.http.post('/role/list/', param);
  }

  public getRolesDetail(id: number): Observable<Role> {
    return this.http.get(`/role/${id}/`);
  }

  public addRoles(param: Role): Observable<void> {
    return this.http.post('/role/', param);
  }

  public delRoles(ids: number[]): Observable<void> {
    return this.http.post('/role/del/', {ids});
  }

  public editRoles(param: Role): Observable<void> {
    return this.http.put('/role/', param);
  }

  public getPermissionById(id: number): Observable<string[]> {
    return this.http.get(`/permission/${id}/`);
  }

  public updatePermission(param: PutPermissionParam): Observable<NzSafeAny> {
    return this.http.put('/permission/', param);
  }

}
