import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authCodeArray$ = new BehaviorSubject<string[]>([]);

  constructor() {
  }

  parsToken(token: string): string[] {
    const helper = new JwtHelperService();
    const {rol} = helper.decodeToken(token);
    return rol.split(',');
  }

  setAuthCode(authArr: string[]): void {
    this.authCodeArray$.next(authArr);
  }

  getAuthCode(): Observable<string[]> {
    return this.authCodeArray$.asObservable();
  }
}
