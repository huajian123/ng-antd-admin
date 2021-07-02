import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {Observable} from 'rxjs';
import {DeptObj, PageInfo, SearchCommonVO} from '../../types';

@Injectable({
  providedIn: 'root'
})
export class DeptManageService {

  constructor(public http: BaseHttpService) {
  }

  public getDeptList(param: SearchCommonVO<any>): Observable<PageInfo<DeptObj>> {
    return this.http.post('/department', param);
  }

  public delDept(idArray: number[]): Observable<any> {
    return this.http.post(`/del-department`, {ids: idArray});
  }

  public getDeptDetail(id: number): Observable<DeptObj> {
    return this.http.get(`/department/${id}`);
  }

  public addDept(param: DeptObj): Observable<any> {
    return this.http.post('/department', param, {needSuccessInfo: true});
  }

  public editDept(param: DeptObj): Observable<any> {
    return this.http.put('/department', param, {needSuccessInfo: true});
  }

}
