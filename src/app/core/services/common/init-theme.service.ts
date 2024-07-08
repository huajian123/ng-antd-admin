import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { StyleThemeModelKey, ThemeOptionsKey } from '@config/constant';
import { StyleTheme, ThemeService } from '@store/common-store/theme.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { WindowService } from './window.service';

type setThemeProp = 'setStyleThemeMode' | 'setThemesMode';
type getThemeProp = 'getStyleThemeMode' | 'getThemesMode';

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
  private themesService = inject(ThemeService);
  private windowServe = inject(WindowService);
  destroyRef = inject(DestroyRef);

  themeInitOption: InitThemeOption[] = [
    {
      storageKey: StyleThemeModelKey,
      setMethodName: 'setStyleThemeMode',
      getMethodName: 'getStyleThemeMode'
    },
    {
      storageKey: ThemeOptionsKey,
      setMethodName: 'setThemesMode',
      getMethodName: 'getThemesMode'
    }
  ];

  initTheme(): Promise<void> {
    // todo 有待优化
    return new Promise(resolve => {
      this.themeInitOption.forEach(item => {
        const hasCash = this.windowServe.getStorage(item.storageKey);
        if (hasCash) {
          if (item.setMethodName === 'setStyleThemeMode') {
            this.themesService[item.setMethodName](hasCash as StyleTheme);
          } else {
            this.themesService[item.setMethodName](JSON.parse(hasCash));
          }
        } else {
          (this.themesService[item.getMethodName]() as Observable<NzSafeAny>).pipe(first(), takeUntilDestroyed(this.destroyRef)).subscribe(res => {
            if (item.setMethodName === 'setStyleThemeMode') {
              this.windowServe.setStorage(item.storageKey, res);
            } else {
              this.windowServe.setStorage(item.storageKey, JSON.stringify(res));
            }
          });
        }
      });
      return resolve();
    });
  }
}
