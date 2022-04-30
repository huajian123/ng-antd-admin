import {Injectable} from '@angular/core';
import {WindowService} from "../services/common/window.service";
import {TokenKey} from "@config/constant";
import {UserInfoService} from "@store/common-store/userInfo.service";
import {LoginInOutService} from "@core/services/common/login-in-out.service";

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private userInfoService: UserInfoService,
              private loginInOutService: LoginInOutService,
              private windowSer: WindowService) {
  }

  load(): Promise<void> {
    const token = this.windowSer.getStorage(TokenKey);
    if (token) {
     return this.loginInOutService.loginIn(token).then()
    }
    return new Promise((resolve) => {
      return resolve();
    });
  }
}
