import { inject, Injectable } from '@angular/core';

import { TokenKey, TokenPre } from '@config/constant';
import { LoginInOutService } from '@core/services/common/login-in-out.service';

import { WindowService } from '../services/common/window.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private loginInOutService = inject(LoginInOutService);
  private windowSer = inject(WindowService);

  load(): Promise<void> {
    const token = this.windowSer.getSessionStorage(TokenKey)?.replace(TokenPre, '');
    if (token) {
      return this.loginInOutService.loginIn(token);
    }
    return new Promise(resolve => {
      return resolve();
    });
  }
}
