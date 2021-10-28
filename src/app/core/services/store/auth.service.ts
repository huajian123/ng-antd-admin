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
    try {
      let {rol} = helper.decodeToken(token);
      // 模拟权限码
      // rol = "0006,0028,0138,0007,0018,0238,0128,0004,0005,0002,0001,0518,0318,0418,0008,0118,0338,0228,0218,0009,0328";
      console.log('权限码' + rol.split(','));
      return rol.split(',');
    } catch (e) {
      const rol  = "0006,0028,0138,0007,0018,0238,0128,0004,0005,0002,0001,0518,0318,0418,0008,0118,0338,0038,0228,0218,0009,0328";
      return rol.split(',');
    }

  }

  setAuthCode(authArr: string[]): void {
    this.authCodeArray$.next(authArr);
  }

  getAuthCode(): Observable<string[]> {
    return this.authCodeArray$.asObservable();
  }
}
