import {Injectable} from '@angular/core';
import {PreloaderService} from "../services/common/preloader.service";
import {WindowService} from "../services/common/window.service";

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private windowSer: WindowService,
              private preloaderService: PreloaderService) {
  }

  load(): Promise<void> {
    this.preloaderService.removePreLoader();
    return new Promise((resolve, reject) => {
      return resolve();
    });
  }
}
