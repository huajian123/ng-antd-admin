import {Injectable} from '@angular/core';
import {AuthService} from '../services/store/auth.service';
import {WindowService} from '../services/common/window.service';
import {AuthKey} from '../../configs/constant';
import {PreloaderService} from '../services/common/preloader.service';

@Injectable()
export class StartupService {
  constructor(private authService: AuthService, private windowSer: WindowService,
              private preloaderService: PreloaderService) {
  }

  load(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('项目启动前初始化工作');
      this.preloaderService.removePreLoader();
      const token = this.windowSer.getStorage(AuthKey);
      if (token) {
        this.authService.setAuthCode(this.authService.parsToken(token));
      }
      return resolve();
    });
  }
}
