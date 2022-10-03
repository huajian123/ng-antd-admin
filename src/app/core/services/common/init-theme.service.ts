import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { IsNightKey, ThemeOptionsKey } from '@config/constant';
import { ThemeService } from '@store/common-store/theme.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { WindowService } from './window.service';

type setThemeProp = 'setIsNightTheme' | 'setThemesMode';
type getThemeProp = 'getIsNightTheme' | 'getThemesMode';

interface InitThemeOption {
  storageKey: string;
  setMethodName: setThemeProp;
  getMethodName: getThemeProp;
}

/*
 * 初始化theme
 * */
@Injectable({
  providedIn: 'root'
})
export class InitThemeService {
  themeInitOption: InitThemeOption[] = [
    {
      storageKey: IsNightKey,
      setMethodName: 'setIsNightTheme',
      getMethodName: 'getIsNightTheme'
    },
    {
      storageKey: ThemeOptionsKey,
      setMethodName: 'setThemesMode',
      getMethodName: 'getThemesMode'
    }
  ];

  constructor(private themesService: ThemeService, private windowServe: WindowService) {}

  initTheme(): Promise<void> {
    return new Promise(resolve => {
      this.themeInitOption.forEach(item => {
        const hasCash = this.windowServe.getStorage(item.storageKey);
        if (hasCash) {
          this.themesService[item.setMethodName](JSON.parse(hasCash));
        } else {
          (this.themesService[item.getMethodName]() as Observable<NzSafeAny>).pipe(first()).subscribe(res => this.windowServe.setStorage(item.storageKey, JSON.stringify(res)));
        }
      });
      return resolve();
    });
  }
}
