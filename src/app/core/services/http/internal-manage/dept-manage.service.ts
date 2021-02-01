import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {Observable} from 'rxjs';
import {DeptObj} from '../../types';

@Injectable({
  providedIn: 'root'
})
export class DeptManageService {

  constructor(public http: BaseHttpService) {
  }

  public getDeptList(): Observable<DeptObj[]> {
    return this.http.get('/department');
  }

  public addDept(param: DeptObj): Observable<any> {
    return this.http.post('/department', param);
  }

  public editDept(param: DeptObj): Observable<any> {
    return this.http.put('/department', param);
  }

}
