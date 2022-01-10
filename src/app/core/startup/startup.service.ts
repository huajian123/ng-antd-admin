import {Injectable} from '@angular/core';
import {WindowService} from "../services/common/window.service";
import {AuthKey} from "@config/constant";
import {AuthService} from "@store/auth.service";

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private authService: AuthService, private windowSer: WindowService) {
  }

  load(): Promise<void> {
    const token = this.windowSer.getStorage(AuthKey);
    if (token) {
      this.authService.setAuthCode(this.authService.parsToken(token));
    }
    return new Promise((resolve, reject) => {
      return resolve();
    });
  }
}
