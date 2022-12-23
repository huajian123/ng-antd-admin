
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

export interface UserInfo {
  userId: any;
  authCode: string[];
  username: any;
  email: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo$ = new BehaviorSubject<UserInfo>({ userId: -1, authCode: [], username: -1, email: -1 });

  constructor() {}

  parsToken(token: string): UserInfo {
    const helper = new JwtHelperService();
    try {
      const { rol, userId, username, email } = helper.decodeToken(token);
      return {
        userId,
        authCode: rol.split(','),
        username: username,
        email: email
      };
    } catch (e) {
      return {
        userId: -1,
        authCode: [],
        username: -1,
        email: -1
      };
    }
  }

  setUserInfo(userInfo: UserInfo): void {
    this.userInfo$.next(userInfo);
  }

  getUserInfo(): Observable<UserInfo> {
    return this.userInfo$.asObservable();
  }
}
