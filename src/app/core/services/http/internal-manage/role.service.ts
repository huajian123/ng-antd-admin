import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {PageInfo, Permission, PutPermissionParam, Role, SearchCommonVO} from '../../types';
import {Observable} from 'rxjs';

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

  public getRolesDetail(id: number): Observable<Role> {
    return this.http.get('/role/' + id);
  }

  public addRoles(param: Role): Observable<void> {
    // return of(this.mockRole);
    return this.http.post('/role', param);
  }

  public delRoles(id: number): Observable<void> {
    return this.http.delete('/role/' + id);
  }

  public editRoles(param: Role): Observable<void> {
    return this.http.put('/role', param);
  }

  // 获取所有权限信息
  public getPermission(): Observable<Permission[]> {
    return this.http.get('/permission');
  }

  public getPermissionById(id: number): Observable<string[]> {
    return this.http.get(`/role-permission/${id}`);
  }

  public updatePermission(param: PutPermissionParam): Observable<any> {
    return this.http.put('/permission', param, {needSuccessInfo: true});
  }

}
