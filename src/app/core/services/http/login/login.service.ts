import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {Observable} from 'rxjs';
import {UserLogin} from '../../types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: BaseHttpService) {
  }

  public login(params: UserLogin): Observable<any> {
    return this.http.post('/login', params, {needSuccessInfo: false});
  }
}
