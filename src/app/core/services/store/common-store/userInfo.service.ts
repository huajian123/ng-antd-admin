import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

export interface UserInfo {
  userId: number,
  authCode: string[]
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo$ = new BehaviorSubject<UserInfo>({userId: -1, authCode: []});

  constructor() {
  }

  parsToken(token: string): UserInfo {
    const helper = new JwtHelperService();
    try {
      let userInfo: UserInfo = helper.decodeToken(token);
      // 模拟用户信息,按道理解析出来的就应该直接return userInfo
      const authCode = "0006,0028,0138,0007,0018,0238,0128,0004,0005,0002,0001,0518,0318,0418,0008,0118,0338,0228,0218,0009,0328";
      userInfo.authCode = authCode.split(',');
      userInfo.userId = 1;
      return userInfo;
    } catch (e) {
      const rol = "0006,0028,0138,0007,0018,0238,0128,0004,0005,0002,0001,0518,0318,0418,0008,0118,0338,0038,0228,0218,0009,0328";
      console.log('模拟权限码' + rol.split(','));
      return {
        userId: 1,
        authCode: rol.split(',')
      }
    }

  }

  setUserInfo(userInfo: UserInfo): void {
    this.userInfo$.next(userInfo);
  }

  getUserInfo(): Observable<UserInfo> {
    return this.userInfo$.asObservable();
  }
}
