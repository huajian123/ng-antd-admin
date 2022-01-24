import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {Observable} from 'rxjs';
import {DeptObj} from '../../types';
import {NzSafeAny} from "ng-zorro-antd/core/types";

@Injectable({
  providedIn: 'root'
})
export class DeptManageService {

  constructor(public http: BaseHttpService) {
  }

  public getDeptList(): Observable<DeptObj[]> {
    return this.http.get('/department/list');
  }

  public delDept(idArray: number[]): Observable<NzSafeAny> {
    return this.http.post(`department/del`, {ids: idArray});
  }

  public getDeptDetail(id: number): Observable<DeptObj> {
    return this.http.get(`/department/${id}`);
  }

  public addDept(param: DeptObj): Observable<NzSafeAny> {
    return this.http.post('/department', param, {needSuccessInfo: true});
  }

  public editDept(param: DeptObj): Observable<NzSafeAny> {
    return this.http.put('/department', param, {needSuccessInfo: true});
  }

}
