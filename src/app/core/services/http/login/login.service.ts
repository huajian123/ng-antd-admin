import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {Observable} from 'rxjs';
import {User, UserLogin} from '../../types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: BaseHttpService) {
  }

  public login(params: UserLogin): Observable<User> {
    return this.http.post('/login', params, {needSuccessInfo: false});
  }

  public ceshi(): Observable<any> {
    return this.http.get('/preAuthorize');
  }
}
