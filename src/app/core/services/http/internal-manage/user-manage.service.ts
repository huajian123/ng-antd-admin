import { Injectable } from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {PageInfo, People, Role, SearchCommonVO} from '../../types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  constructor(public http: BaseHttpService) {
  }


  public getPeoples(param: SearchCommonVO<any>): Observable<PageInfo<People>> {
    return this.http.post('/list-user', param);
  }

  public addUsers(param: People): Observable<any> {
    return this.http.post('/user', param);
  }

  public editUsers(param: People): Observable<any> {
    return this.http.post('/list-user', param);
  }

}
